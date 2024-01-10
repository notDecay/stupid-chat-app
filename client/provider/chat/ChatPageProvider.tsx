import { 
  createContext, 
  type ParentProps,
  useContext
} from "solid-js"
import type { IChannel } from "../../api/channel"
import type { IUser } from "../../api/user"
import { EventEmitter } from "../../utils"

export const enum ChatPageEvent {
  userNotLogedIn
}

type ChatPageEventEmitter = EventEmitter<{
  // 
}>

export interface IChatPageContext {
  channelList: IChannel[] | null
  user: IUser
  event: ChatPageEventEmitter
}

const Context = createContext<IChatPageContext>()

export interface IChatPageProviderProps extends Omit<IChatPageContext, "event"> {
  // ...
}

export function ChatPageProvider(props: ParentProps<{
  value: IChatPageProviderProps
}>) {
  return (
    <Context.Provider value={{
      ...props.value,
      event: new EventEmitter()
    }}>
      {props.children}
    </Context.Provider>
  )
}

export function useChatPage() {
  const it = useContext(Context)
  if (!it) throw new Error('Make sure you wrap it inside <ChatPageProvider />')
  return it
}