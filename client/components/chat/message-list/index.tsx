import { For, Match, Switch, createSignal } from "solid-js"
import { ChatMessageEvents, useChatMessages } from "../../provider/ChatMessagesProvider"
import { MessageOptions } from "../message/MessageOptions"
import { UserMessage } from "../message"
import { logdown, scrollDown } from "../../../utils"
import ChatMessageInput from "../message-input"
import stylex from "@stylexjs/stylex"

import { MessageCache } from "./cache"
import { Message } from "./message"
import { processMessage } from "./messageProcessing"
import { removeAndUpdateMessage } from "./messageUpdate"

import { SocketRoutes } from "../../../../config/app_config"
import { socket } from "../../../page/chat/ChatPage"

const chatMessageListStyle = stylex.create({
  messageList: {
    maxHeight: "80vh",
    paddingBottom: "2rem",
    width: "100%",
    height: "100%",
    overflowY: "scroll"
  }
})

const messageCacheStore = MessageCache.createIfItsNotExist("root")

export default function ChatMessageList() {
  const { event } = useChatMessages()
  // handle update incoming messages
  const [messageList, setMessageList] = createSignal<Message.IUserMessage[]>([])
  // handle message options (eg. reply, delete, ...)
  const [action, setAction] = createSignal<MessageOptions>()
  // show the reply to, on top of the message input
  const [replyToMessage, setReplyToMessage] = createSignal<Message.IUserMessage>()

  let chatMessageList: HTMLDivElement
  const handleMessage = (message: UserMessage.IUserMessageProps) => {
    return <UserMessage.Message {...message} />
  }

  const renderMessage = (
    messageToSendData: Message.IUserMessage,
    isFollowUp: boolean
  ) => {
    setMessageList([...messageList(), {
      ...messageToSendData,
      isFollowUp,
      replyTo: replyToMessage()
    }])

    // if you reply to someone, hide replying to pop up
    // on the message input
    hideReplyTo()
    scrollDown(chatMessageList)
    // save it to a cache for future needs
    messageCacheStore.set(messageToSendData.id, messageToSendData)
  }

  const sendingMessagehandler = async (messageContent: string) => {
    // step 1. do some message processing stuff
    const {
      isFollowUpMessage,
      messageToSendData
    } = await processMessage({
      messageContent,
      lastMessageInCache: MessageCache.getLastMessage("root")
    })
    // step 2. update it to the ui
    console.log('sending message')
    
    socket.emit(SocketRoutes.messageCreate, messageToSendData, isFollowUpMessage)
  }

  socket.on(SocketRoutes.messageCreate, (messageToSendData, isFollowUp) => {
    console.log('Data got:', messageToSendData, isFollowUp)
    renderMessage(messageToSendData, isFollowUp)
  })

  const hideReplyTo = () => {
    setAction(undefined)
    setReplyToMessage(undefined)
  }

  event.on(ChatMessageEvents.messageOptionClicked, async (type, messageId) => {
    switch (type) {
      case "delete": {
        if (replyToMessage()?.id === messageId) {
          hideReplyTo()
        }

        removeAndUpdateMessage(messageCacheStore, messageId)
      } break

      case "reply": {
        const message = await Message.fetch({
          channelId: "root",
          messageId
        })

        if (!message) {
          logdown.err("failed to fetch message")
          break
        }

        setReplyToMessage(message)
        setAction("reply")
      } break
    }
  })

  return (
    <>
      <div 
        {...stylex.props(chatMessageListStyle.messageList)}
        ref={chatMessageList!}
      >
        <For each={messageList()}>
          {handleMessage}
        </For>
      </div>
      <ChatMessageInput.Input onSendingMessage={sendingMessagehandler}>
        <Switch>
          <Match when={action() == "reply"}>
            <ChatMessageInput.ReplyTo {...replyToMessage()!} onClose={() => setAction(undefined)} />
          </Match>
        </Switch>
      </ChatMessageInput.Input>
    </>
  )
}