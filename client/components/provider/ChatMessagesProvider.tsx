import { type ParentProps, createContext, useContext } from "solid-js"
import { event } from "../../utils"

export const enum ChatMessageEvents {
  replyButtonSelected,
  deleteButtonSelected
}

type ChatMessageEvent = event<{
  [ChatMessageEvents.replyButtonSelected]: [messageId: string]
  [ChatMessageEvents.deleteButtonSelected]: [messageId: string]
}>

interface IChatMessagesContext {
  event: ChatMessageEvent
}

const Context = createContext<IChatMessagesContext>()

export function ChatMessagesProvider(props: ParentProps) {
  return (
    <Context.Provider value={{
      event: new event()
    }}>
      {props.children}
    </Context.Provider>
  )
}

export function useChatMessages() {
  const context = useContext(Context)
  if (!context) {
    throw new Error("make sure to wrap it inside <ChatMessagesProvider />")
  }

  return context
}