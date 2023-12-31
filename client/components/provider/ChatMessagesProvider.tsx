import {
  type ParentProps, 
  createContext, 
  useContext 
} from "solid-js"
import { 
  event 
} from "../../utils"
import type { 
  MessageActions 
} from "../chat/message/actions"

export const enum ChatMessageEvents {
  /**Whenever the message option has been clicked
   * 
   * @see {@link MessageActions} for all of the message options
   */
  messageOptionClicked,
}

type ChatMessageEvent = event<{
  [ChatMessageEvents.messageOptionClicked]: [type: MessageActions, messageId: string]
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