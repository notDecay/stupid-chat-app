import { io, type Socket } from "socket.io-client"
import {
  type ParentProps, 
  createContext, 
  useContext
} from "solid-js"

interface IChatPageContext {
  socket: Socket
}

const Context = createContext<IChatPageContext>()

export function ChatPageProvider(props: ParentProps) {
  return (
    <Context.Provider value={{
      socket: io()
    }}>
      {props.children}
    </Context.Provider>
  )
}

export function useChatPage() {
  const context = useContext(Context)
  if (!context) {
    throw new Error("make sure to wrap it inside <ChatPageProvider />")
  }

  return context
}