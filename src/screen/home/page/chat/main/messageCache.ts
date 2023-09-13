import logdown from "@utils/logdown"
import type { IMessageCache } from "./Chat"

export type MessageCacheManager = Map<string, IMessageCache>
type MessageCacheStore = Map<string, MessageCacheManager>
/**This thing here responsible for storing all of the message.
 * 
 * #### Structure of it
 * Each name in the map is a {@link MessageCacheManager} object, when click a conversation,
 * the app will switch the last message cache to a new one.
 * 
 * Then the app can use it to render the message.
 * ```
 * [
 *   <chat_uuid> => [<message_cache>]
 *   ...
 * ]
 * ```
 * 
 * Where `<chat_uuid>` is the conversation uuid, `<message_cache>` is the 
 * message(s) that recently saved by the app
 */
const cacheStore: MessageCacheStore = new Map()

/**Creates a message cache store if it hasn't been created yet 
 * or returns a old cache store.
 * @param routeName the route name
 * @returns a newly created / old {@link MessageCacheManager}
 */
export function createCacheStoreIfNeeds(routeName: string) {
  if (cacheStore.has(routeName)) {
    logdown.info(`"${routeName}" cache store already exist, no need to create a new one`)
    return cacheStore.get(routeName)!
  }

  const messageStore: MessageCacheManager = new Map()
  cacheStore.set(routeName, messageStore)
  logdown.info(`Cannot find "${routeName}" cache store
    created new cache store: "${routeName}"
  `)
  return messageStore
}