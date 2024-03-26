import { 
  type AnyCachedMessage,
  ChatEvent, 
  type ChatEventMap, 
  type IApiChannel, 
} from "~/features/chat"
import { AppRoutes } from "public"
import { store } from "../storage"

/**Interface for update chat message options. */
interface IUpdateChatMessageOptions {
  /**A list of channels, provided by the `useChat()` hook */
  channels: IApiChannel[]
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
 * it emits `ChatEvent.messagePageFetching` event, meanwhile fetching for its data.
 * 
 * Finally, it updates the current channel data with the found channel and messages 
 * and emits `ChatEvent.messagePageUpdated`.
 * 
 * @param options Update options including channels, pathname, and chat event emitter.
 * @returns a `Promise` resolves *nothing*
 * 
 * @see {@link IUpdateChatMessageOptions}
 * @see {@link ChatEvent}
 */
export async function updateChatMessageIfNeed(options: IUpdateChatMessageOptions) {
  const { channels, pathname, chatEvent } = options

  if (!pathname.includes(AppRoutes.channel)) {
    return console.log('Update rejected')
  }

  const channelId = pathname.replace(`${AppRoutes.channel}/`, '')
  console.log(channelId)

  const channel = channels.find(it => it.id === channelId)
  if (!channel) {
    return console.warn('cannot find channel id', channelId)
  }

  console.log('current channel id:', channelId)
  
  let messages: AnyCachedMessage[] = store.message.toArray(channelId)
  if (messages.length === 0) {
    chatEvent.emit(ChatEvent.messagePageFetching)
    await new Promise(resolve => setTimeout(resolve, 2000))
  }

  const [, setCurrentChannel] = store.currentChannel
  setCurrentChannel({
    channel,
    messages
  })

  chatEvent.emit(ChatEvent.messagePageUpdated, {
    channel,
    messages
  })
}