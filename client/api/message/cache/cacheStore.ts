import type { CachedChatMessage } from "../message"

type MessageCacheStore = Map<string, CachedChatMessage>
type MessageCacheStoreList = Map<string, MessageCacheStore>

export const cache: MessageCacheStoreList = new Map()

export function isExistThisStore(channelId: string) {
  return cache.has(channelId)
}

export function create(channelId: string) {
  if (isExistThisStore(channelId)) {
    return console.warn(`message store "${channelId}" already created`)
  }
  
  cache.set(channelId, new Map())
}

export function set(channelId: string, message: CachedChatMessage) {
  if (!isExistThisStore(channelId)) return

  const store = cache.get(channelId)
  if (!store) return

  store.set(message.id, message)
}

type LastMessageCacheStore = Map<string, CachedChatMessage>
export const lastMessageCache: LastMessageCacheStore = new Map()