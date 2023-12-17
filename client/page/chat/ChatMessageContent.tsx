import { 
  ScrollBar, 
  useChatMessages, 
  ChatMessageInput,
  ChatMessageEvents,
  FullView,
  UserMessage,
  MESSAGE_FOLLOW_UP_KEY
} from "../../components"
import { 
  Message,
  MessageCache, 
  logdown, 
  processMessage, 
  scrollDown 
} from "../../utils"
import { 
  For, 
  Match, 
  Switch, 
  createSignal 
} from "solid-js"
import type { 
  MessageOptions 
} from "../../components/chat-message/MessageOptions"

const messageCacheStore = MessageCache.createIfItsNotExist("root")

export default function ChatMessageContent() {
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

  const sendingMessagehandler = async (messageContent: string) => {
    const {
      isFollowUpMessage,
      messageToSendData,
      messageId
    } = await processMessage({
      messageContent,
      lastMessageInCache: MessageCache.getLastMessage("root")
    })

    setMessageList([...messageList(), {
      ...messageToSendData,
      isFollowUp: isFollowUpMessage,
      replyTo: replyToMessage()
    }])

    hideReplyTo()
    scrollDown(chatMessageList)
    messageCacheStore.set(messageId, messageToSendData)
  }

  const hideReplyTo = () => {
    setAction(undefined)
    setReplyToMessage(undefined)
  }

  event.on(ChatMessageEvents.messageOptionClicked, async (type, messageId) => {
    switch (type) {
      case "delete": {
        if (replyToMessage()) hideReplyTo()
        removeAndUpdateMessage(messageId)
      } break

      case "reply": {
        const message = await Message.fetch({
          channelId: "root",
          messageId
        })!

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
      <FullView 
        as={ScrollBar} 
        maxHeight="80vh" 
        paddingBottom="2rem"
        ref={chatMessageList!}
      >
        <For each={messageList()}>
          {handleMessage}
        </For>
      </FullView>
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

/**Remove the message that has the id `messageId` (if exist),
 * then update it.
 * @param messageId the message id it will be removed
 * @returns         *nothing*
 */
function removeAndUpdateMessage(messageId: string) {
  // convert all of the message id from messageCacheStore to an array
  const keys = Array.from(messageCacheStore.keys())
  // grap the message that it will be removed 
  const messageToDelete = document.getElementById(messageId)
  // grap the message bellow the message that it will be removed
  const messageToDeleteIndex = keys.indexOf(messageId)
  const messageOnBottom = document.getElementById(keys[messageToDeleteIndex + 1])
  // update the message of the bottom to a normal message (if needed)
  if (
    !messageToDelete?.classList.contains(MESSAGE_FOLLOW_UP_KEY) &&
    messageOnBottom?.classList.contains(MESSAGE_FOLLOW_UP_KEY)
  ) {
    messageOnBottom.classList.remove(MESSAGE_FOLLOW_UP_KEY)
  }
  // delete it
  messageToDelete?.remove()
  messageCacheStore.delete(messageId)
}