import { 
  type AnyCachedMessage,
  ChatEvent, 
  type ChatEventMap, 
  type IApiChannel,
  type IChatMessageUpdateData, 
} from "~/features/chat"
import { AppRoutes } from "public"
import { store } from "../storage"
import { Store } from "~/utils"
import { produce } from "solid-js/store"

/**Interface represent for list of channels stored by the chat via `createStore()`
 * 
 * @extends IApiChannel
 * @see {@link IApiChannel}
 */
export interface IChannelsStoreData extends IApiChannel {
  /**A special flag represent if the app should fetch that channel data. 
   * After it done fetching, it set to `true` to avoid fetching it again.
   * 
   * @default false
   */
  isFetched: boolean
}

/**Interface for update chat message options. */
interface IUpdateChatMessageOptions {
  /**A list of channels, provided by the `useChat()` hook */
  channelsStore: Store<IChannelsStoreData[]>
  /**Pathname of the current location. Can get it via here:
   * ```
   * import { location } from "@solidjs/router"
   * const pathname = location.pathname
   * //    ^^^^^^^^
   * ```
   */
  pathname: string
  /**A reference to chat eventemitter, provided by the `useChat()` hook */
  chatEvent: ChatEventMap
}

/**Updates the current channel data if needed based on the provided options.
 * 
 * This function checks if the pathname corresponds to a channel route. 
 * If it does, it extracts the channel ID from the pathname and finds the corresponding channel data.
 * 
 * If the channel data is not found or there are no messages, 
 * it emits `ChatEvent.messagePageFetching` event, meanwhile fetching for its data
 * then setting a special flag called `isFetched` to `true` to avoid fetching it again.
 * 
 * Finally, it updates the current channel data with the found channel and messages 
 * and emits `ChatEvent.messagePageUpdated`.
 * 
 * @param options Update options including channels, pathname, and chat event emitter.
 * @returns a `Promise` resolves *nothing*
 * 
 * @see {@link IUpdateChatMessageOptions}
 * @see {@link IChannelsStoreData}
 * @see {@link ChatEvent}
 */
export async function updateChatMessageIfNeed(options: IUpdateChatMessageOptions) {
  const { channelsStore, pathname, chatEvent } = options

  if (!pathname.includes(AppRoutes.channel)) {
    return console.log('Update rejected')
  }

  const [channels, setChannels] = channelsStore
  const channelId = pathname.replace(`${AppRoutes.channel}/`, '')
  console.log(channelId)

  const channel = channels.find(it => it.id === channelId)
  if (!channel) {
    return console.warn('cannot find channel id', channelId)
  }

  console.log('current channel id:', channelId)
  
  let messages: AnyCachedMessage[] = store.message.toArray(channelId)
  if (messages.length === 0 && !channel.isFetched) {
    chatEvent.emit(ChatEvent.messagePageFetching)
    await new Promise(resolve => setTimeout(resolve, 2000))
    setChannels(
      thisChannel => thisChannel.id === channelId,
      produce(
        it => (it.isFetched = true)
      )
    )
  }

  const [, setCurrentChannel] = store.currentChannel

  const updateData = {
    channel,
    messages,
    input: {
      text: '',
      replyTo: undefined
    }
  } as IChatMessageUpdateData
  
  setCurrentChannel(updateData)
  chatEvent.emit(ChatEvent.messagePageUpdated, updateData)
}