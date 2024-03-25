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
  currentChannel,
  saveMessageIntoCache
} from "~/features/chat"
// ...
import stylex from "@stylexjs/stylex"
import { apiMessageToCachedMessage } from "~/features/chat/utils"

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
  const { chatEvent, stores } = useChat()

  const location = useLocation()
  const [channels] = stores.channels
  createEffect(() => {
    updateChatMessageIfNeed({
      channels,
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
  const [thisCurrentChannel] = currentChannel
  const onSendingHandler: IMessageInputProps["onSending"] = async (data) => {
    const messageFromServer = await createMessage(MessageType.user, data)
    const processedMessage = apiMessageToCachedMessage(messageFromServer, thisCurrentChannel.channel.id)
    console.log(processedMessage)
    
    setMessages([...messages(), processedMessage])
    saveMessageIntoCache(thisCurrentChannel.channel.id, processedMessage)
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