import { Box } from "@hope-ui/solid"
import { 
  ScrollBar, 
  useChatMessages, 
  Message as MessageComponent, 
  ChatMessageInput,
  ChatMessageEvents, 
} from "../../components"
import { 
  MessageCache, 
  processMessage, 
  scrollDown 
} from "../../utils"
import { 
  For, 
  createSignal 
} from "solid-js"
import type { 
  IUserMessageProps 
} from "../../components/chat-message/UserMessage"

const messageCacheStore = MessageCache.createIfItsNotExist("root")

export default function ChatMessageContent() {
  let chatMessageList: HTMLDivElement
  const { event } = useChatMessages()
  const [messageList, setMessageList] = createSignal<any[]>([])
  const handleMessage = (message: IUserMessageProps) => {
    return <MessageComponent.UserMessage {...message} />
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
      isFollowUp: isFollowUpMessage
    }])
    scrollDown(chatMessageList)
    messageCacheStore.set(messageId, messageToSendData)
  }

  event.on(ChatMessageEvents.replyButtonSelected, (messageId) => {
    // ...
  })

  event.on(ChatMessageEvents.deleteButtonSelected, (messageId) => {
    console.log(document.getElementById(messageId));
    
    document.getElementById(messageId)?.remove()
    messageCacheStore.delete(messageId)
  })

  return (
    <>
      <Box 
        boxSize="100%" 
        as={ScrollBar} 
        maxHeight="80vh" 
        paddingBottom="2rem"
        ref={chatMessageList!}
      >
        <For each={messageList()}>
          {handleMessage}
        </For>
      </Box>
      <ChatMessageInput onSendingMessage={sendingMessagehandler} />
    </>
  )
}