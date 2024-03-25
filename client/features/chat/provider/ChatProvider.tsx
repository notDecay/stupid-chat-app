import { type ParentProps, createContext } from "solid-js"
import { createStore } from "solid-js/store"
// ...
import { type IApiChannel } from "../api"
import { type Store, useContext, EventEmitter } from "~/utils"
import { IChatData } from "../methods"
// events
import { ChatEventMap } from "./chatEvent"
import { ChatMessageEventMap } from "./messageEvent"

export interface IChatContext {
  stores: {
    channels: Store<IApiChannel[]>
  },
  /**Event related to chat */
  chatEvent: ChatEventMap,
  /**Event related to chat messages, eg. update, edit, delete message and stuff */
  messageEvent: ChatMessageEventMap
}

const Context = createContext<IChatContext>()

interface IChatProviderProps {
  data: IChatData | undefined
}

export function ChatProvider(props: ParentProps<IChatProviderProps>) {
  const getValue = (): IChatContext => {
    return {
      stores: {
        channels: createStore(props.data?.channels || []),
      },
      chatEvent: new EventEmitter(),
      messageEvent: new EventEmitter(),
    }
  }

  return (
    <Context.Provider value={getValue()}>
      {props.children}
    </Context.Provider>
  )
}

export const useChat = useContext(Context, `Make sure to wrap it inside <${ChatProvider.name} />`)