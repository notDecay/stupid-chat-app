import { type ParentProps, createContext } from "solid-js"
// ...
import { useContext, EventEmitter } from "~/utils"
import { IChannelsStoreData, IChatData } from "../methods"
// events
import type { ChatEventMap } from "./chatEvent"
import type { ChatMessageEventMap } from "./messageEvent"
import { store } from "../storage"
import { IApiChannel } from "../api"

export interface IChatContext {
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

/**This component provides a context for managing chat events.
 *
 * @param props The component's properties.
 * @returns `JSX.Element`
 * 
 * @see {@link IChatProviderProps}
 */
export function ChatProvider(props: ParentProps<IChatProviderProps>) {
  const [, setChannels] = store.channels
  const [, setUser] = store.user
  const newChannel: IChannelsStoreData[] = []

  const convertChannel = (channel: IApiChannel) => {
    return {
      ...channel,
      isFetched: false
    } as IChannelsStoreData
  }

  const getValue = (): IChatContext => {
    for (const channel of (props.data?.channels ?? [])) {
      newChannel.push(convertChannel(channel))
    }

    setChannels(newChannel)

    setUser({
      id: '1000',
      name: 'Some name'
    })

    return {
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