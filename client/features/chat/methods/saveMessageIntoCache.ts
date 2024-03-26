import { AnyCachedMessage } from "../api"
import { store } from "../storage"

/**Saves a message into the cache for a specific channel.
 *
 * @param currentChannel The name of the channel to store the message for.
 * @param message The message to be saved in the cache. 
 * The type of the message can be any cached message format.
 * @returns *nothing*
 * @see {@link AnyCachedMessage}
 */
export function saveMessageIntoCache(currentChannel: string, message: AnyCachedMessage) {
  store.message.set(currentChannel, message)
}