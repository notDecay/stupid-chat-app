import { useLocation } from "@solidjs/router"
import { createEffect, createSignal } from "solid-js"
import { 
  ChatEvent, 
  ChatNavbar, 
  ChatMessageLoadingScreen,
  ChatMessageList,
  type IChatMessageUpdateData, 
  useChat, 
  updateChatMessageIfNeed,
  MessageInput,
  type IMessageInputProps,
  MessageComponentMapping,
  AnyCachedMessage,
  createMessage,
  MessageType,
  saveMessageIntoCache,
  getCurrentChannel
} from "~/features/chat"
// ...
import stylex from "@stylexjs/stylex"
import { apiMessageToCachedMessage } from "~/features/chat/utils"
import { store } from "~/features/chat/storage"

const style = stylex.create({
  mainContent: {
    height: '100%'
  },
  messagePage: {
    position: 'relative',
    width: '100%',
    height: '100%'
  }
})

export default function ChatMessagePage() {
  const [chatPage, setChatPage] = createSignal<IChatMessageUpdateData | undefined>()
  const [isLoading, setIsLoading] = createSignal<boolean>(true)
  const [messages, setMessages] = createSignal<AnyCachedMessage[]>([])
  const { chatEvent } = useChat()

  const location = useLocation()
  createEffect(() => {
    updateChatMessageIfNeed({
      channelsStore: store.channels,
      pathname: location.pathname,
      chatEvent
    })
  })

  // ...
  chatEvent.on(ChatEvent.messagePageFetching, () => {
    setIsLoading(true)
  })

  chatEvent.on(ChatEvent.messagePageUpdated, (pageData) => {
    setChatPage(pageData)
    setMessages(pageData.messages)
    setIsLoading(false)
  })

  // ...
  const onSendingHandler: IMessageInputProps["onSending"] = async (data) => {
    const currentChannel = getCurrentChannel()
    const messageFromServer = await createMessage(MessageType.user, data)
    const processedMessage = apiMessageToCachedMessage(messageFromServer, currentChannel.channel.id)
    console.log(processedMessage)
    
    setMessages([...messages(), processedMessage])
    saveMessageIntoCache(currentChannel.channel.id, processedMessage)
  }

  return (
    <main {...stylex.props(style.mainContent)}>
      <div {...stylex.props(style.messagePage)}>
        <ChatMessageLoadingScreen isLoading={isLoading()} />
        {/* ... */}
        <ChatNavbar channel={chatPage()?.channel} />
        <ChatMessageList messages={messages()}>
          {it => {
            const Message = MessageComponentMapping[it.type]
            return <Message {...it} />
          }}
        </ChatMessageList>
        <MessageInput.Input onSending={onSendingHandler} />
      </div>
    </main>
  )
}