import logdown from "../../utils/logdown"
import type { ChatMessage } from "./message"

export type MessageCacheStore = Map<string, ChatMessage>
export type MutiMessageCacheStore = Map<string, MessageCacheStore>

const cache: MutiMessageCacheStore = new Map()
/**### namespace `MessageCache`
 * Responsibility for caching chat message / chat message management
 */
export namespace MessageCache {
  /**Create a new message store and return it if it's not created,
   * otherwise return the old ones.
   * @param storeName the store name it need to find 
   *                  (mostly the store name is just the channel id)
   * @returns         the message store
   */
  export function createIfItsNotExist(storeName: string): MessageCacheStore {
    if (cache.has(storeName)) {
      return cache.get(storeName)!
    }

    const newMessageCacheStore = new Map()
    cache.set(storeName, newMessageCacheStore)
    return newMessageCacheStore
  }

  /**Find the message cache store by name.
   * @param storeName the store name it need to find 
   *                  (mostly the store name is just the channel id)
   * @returns         the message or `undefined`
   */
  export function getMessageCacheStore(storeName: string) {
    return cache.get(storeName)
  }

  /**Get the last message in the cache store.
   * @param storeName the store name it need to find 
   *                  (mostly the store name is just the channel id)
   * @returns         the message if it found. `undefined` if there's no message in the cache or it
   *                  could not find the message store.
   */
  export function getLastMessage(storeName: string) {
    const currentCache = getMessageCacheStore(storeName)
    if (!currentCache) {
      logdown.warn(`cannot find message cache store: "${storeName}"`)
      return undefined
    }

    return Array.from(currentCache.values()).pop()
  }
}