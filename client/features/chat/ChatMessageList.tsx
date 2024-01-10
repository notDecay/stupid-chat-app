import { For, createSignal } from "solid-js"
import { 
  ChatMessageEvent, 
  useChatMessage 
} from "../../provider/chat/ChatMessageProvider"
import { UserMessage } from "./message/user"
import { 
  type CachedChatMessage, 
  MessageType, 
  processUserMessage, 
  createUserMessage
} from "../../api/message"
import type { ICachedUserMessage } from "../../api/message/user"
import { ChatSocketEvent } from "../../../global/apiRoutes"
import { UserStore } from "../../api/user"

export function ChatMessageList() {
  const { event, channel, socket } = useChatMessage()
  const [messageList, setMessageList] = createSignal<CachedChatMessage[]>([])

  event.on(ChatMessageEvent.messageSend, async (rawMessageContent: string) => {
    const {
      renderMessage
    } = await createUserMessage(rawMessageContent)

    socket.emit(ChatSocketEvent.messageSend, {
      type: MessageType.user,
      messageData: {
        content: renderMessage
      },
      user: UserStore.getUser()
    })
  })

  socket.on(ChatSocketEvent.messageSend, ({ type, message }) => {
    const { isFollowUp } = processUserMessage(channel?.id!, message, message.content)

    setMessageList([...messageList(), {
      ...message,
      isFollowUp,
      renderedMessage: message.content
    } satisfies ICachedUserMessage])
  })

  const showMessage = (message: CachedChatMessage) => {
    switch (message.type) {
      case MessageType.user: {
        return <UserMessage {...message} />
      }
    }
  }

  return (
    <div>
      <For each={messageList()}>
        {showMessage}
      </For>
    </div>
  )
}