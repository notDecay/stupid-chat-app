import { 
  For, 
  Match, 
  Switch, 
  createSignal 
} from "solid-js"
import { 
  ChatMessageEvents, 
  useChatMessages 
} from "../../../provider/ChatMessagesProvider"
import { MessageActions } from "../message/actions"
import { logdown, scrollDown } from "../../../utils"
import ChatMessageInput from "../message-input"
import stylex from "@stylexjs/stylex"

import { MessageCache } from "../../../api/message"
import { 
  type ChatMessage, 
  type IUserMessage, 
  Message,
  processMessage
} from "../../../api/message/"
import { removeAndUpdateMessage } from "./messageUpdate"

import { SocketRoutes } from "../../../../config/app_config"
import __Message from "./renderMessage"
import { useChatPage } from "../../../provider"

const style = stylex.create({
  messageList: {
    maxHeight: "80vh",
    paddingBottom: "2rem",
    width: "100%",
    height: "100%",
    overflowY: "scroll"
  },
  messagePage: {
    display: 'flex',
    width: '100%',
    height: '100%',
  }
})

const messageCacheStore = MessageCache.createIfItsNotExist("root")

export default function ChatMessageList() {
  const { event } = useChatMessages()
  const { socket } = useChatPage()
  // handle update incoming messages
  const [messageList, setMessageList] = createSignal<ChatMessage[]>([])
  // handle message options (eg. reply, delete, ...)
  const [action, setAction] = createSignal<MessageActions>()
  // show the reply to, on top of the message input
  const [replyToMessage, setReplyToMessage] = createSignal<IUserMessage>()

  let chatMessageList: HTMLDivElement
  const hideReplyTo = () => {
    setAction(undefined)
    setReplyToMessage(undefined)
  }

  const renderMessage = (
    messageToSendData: IUserMessage,
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
    
    if (import.meta.env.DEV) {
      return renderMessage(messageToSendData, isFollowUpMessage)
    }
    
    socket.emit(SocketRoutes.messageCreate, messageToSendData, isFollowUpMessage)
  }

  socket.on(SocketRoutes.messageCreate, (messageToSendData, isFollowUp) => {
    renderMessage(messageToSendData, isFollowUp)
  })

  event.on(ChatMessageEvents.messageOptionClicked, async (type, messageId) => {
    switch (type) {
      case MessageActions.Delete: {
        if (replyToMessage()?.id === messageId) {
          hideReplyTo()
        }

        removeAndUpdateMessage(messageCacheStore, messageId)
      } break

      case MessageActions.Reply: {
        const message = await Message.fetch({
          channelId: "root",
          messageId
        })

        if (!message) {
          logdown.err("failed to fetch message")
          break
        }

        setReplyToMessage(message)
        setAction(MessageActions.Reply)
      } break

      default: {
        logdown.warn("action type", type, "hasn't been added yet :(")
      } break
    }
  })

  return (
    <div {...stylex.props(style.messagePage)}>
      <div 
        {...stylex.props(style.messageList)}
        ref={chatMessageList!}
      >
        <For each={messageList()}>
          {__Message}
        </For>
      </div>
      <ChatMessageInput.Input onSendingMessage={sendingMessagehandler}>
        <Switch>
          <Match when={action() == MessageActions.Reply}>
            <ChatMessageInput.ReplyTo {...replyToMessage()!} onClose={() => setAction(undefined)} />
          </Match>
        </Switch>
      </ChatMessageInput.Input>
    </div>
  )
}