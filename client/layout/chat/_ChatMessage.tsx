import { createSignal, onMount } from "solid-js"
import { Channel, getChannelIdFromRoute, type IChannel } from "../../api/channel"
import { 
  ChatMessageEvent, 
  useChatMessage 
} from "../../provider/chat/ChatMessageProvider"
import { useLocation } from "@solidjs/router"
import stylex from "@stylexjs/stylex"

import ChatNavBar from "./ChatNavBar"
import { ChatMessageInput, ChatMessageList } from "../../features/chat"

const style = stylex.create({
  chatPage: {
    position: 'relative'
  }
})

export default function ChatMessage() {
  const { event } = useChatMessage()
  const [channel, setChannel] = createSignal<IChannel | null>(null)
  const location = useLocation()
  
  event.on(ChatMessageEvent.update, ({ channel }) => {
    setChannel(channel)
  })

  onMount(() => {
    event.emit(ChatMessageEvent.update, {
      channel: Channel.cache.get(getChannelIdFromRoute(location.pathname))!,
      lastInputText: ''
    })
  })

  const onSendingMessageHandler = (messageContent: string) => {
    event.emit(ChatMessageEvent.messageSend, messageContent)
  }
  
  return (
    <main {...stylex.props(style.chatPage)}>
      <ChatNavBar channel={channel()} />
      <ChatMessageInput onSendingMessage={onSendingMessageHandler} />
      <ChatMessageList />
    </main>
  )
}