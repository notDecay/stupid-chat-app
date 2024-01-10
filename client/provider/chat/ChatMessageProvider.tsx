import { 
  createContext, 
  type ParentProps,
  useContext
} from "solid-js"
import type { IChannel } from "../../api/channel"
import { EventEmitter, getOrigin } from "../../utils"
import { 
  MessageAction, 
  type ChatSocketEventMap
} from "../../features/chat"
import io, { type Socket } from "socket.io-client"

export const enum ChatMessageEvent {
  update,
  messageSend,
  messageOptionClicked
}

interface IChannelData {
  channel: IChannel
  lastInputText: string
}

export type ChatMessageEventEmitter = EventEmitter<{
  [ChatMessageEvent.update]: [update: IChannelData]
  [ChatMessageEvent.messageSend]: [rawMessageContent: string]
  [ChatMessageEvent.messageOptionClicked]: [option: MessageAction, messageId: string]
}>

export interface IChatMessageContext {
  channel: IChannel | null
  event: ChatMessageEventEmitter
  socket: Socket<
    ChatSocketEventMap.ServerToClient,
    ChatSocketEventMap.ClientToServer
  >
}

const Context = createContext<IChatMessageContext>()

export function ChatMessageProvider(props: ParentProps) {
  return (
    <Context.Provider value={{
      channel: null,
      event: new EventEmitter(),
      socket: io(getOrigin())
    }}>
      {props.children}
    </Context.Provider>
  )
}

export function useChatMessage() {
  const it = useContext(Context)
  if (!it) throw new Error('Make sure you wrap it inside <ChatMessageProvider />')
  return it
}