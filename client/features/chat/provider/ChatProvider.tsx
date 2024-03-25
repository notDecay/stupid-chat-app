import { type ParentProps, createContext } from "solid-js"
import { createStore } from "solid-js/store"
// ...
import { type IApiChannel } from "../api"
import { type Store, useContext, EventEmitter } from "~/utils"
import { IChatData } from "../methods"
// events
import type { ChatEventMap } from "./chatEvent"
import type { ChatMessageEventMap } from "./messageEvent"

export interface IChatContext {
  /**Stores associated with the chat context, providing access to data. */
  stores: {
    /**Store containing an array of channels accessible in the chat context. */
    channels: Store<IApiChannel[]>
  },
  /**Events related to the overall chat functionality.
   * @see {@link ChatEventMap}
   */
  chatEvent: ChatEventMap,
  /**Events related to chat messages, including updates, edits, deletions, etc.
   * @see {@link ChatMessageEventMap}
   */
  messageEvent: ChatMessageEventMap
}

const Context = createContext<IChatContext>()

interface IChatProviderProps {
  /**An optional object containing initial chat data */
  data: IChatData | undefined
}

/**This component provides a context for managing chat data and events.
 *
 * @param props The component's properties.
 * @returns `JSX.Element`
 * 
 * @see {@link IChatProviderProps}
 */
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

/**`useChat` hook retrieves the chat context value.
 *
 * Throws an error if the context is not available, ensuring proper usage within `<ChatProvider />`.
 *
 * @returns The `IChatContext` object for accessing chat data and events.
 * 
 * @see {@link IChatContext}
 * @see {@link ChatProvider}
 */
export const useChat = useContext(Context, `Make sure to wrap it inside <${ChatProvider.name} />`)