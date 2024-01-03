import type { MessageCacheStore } from "./cache"
import { MESSAGE_FOLLOW_UP_KEY } from "../message"

/**Remove the message that has the id `messageId` (if exist),
 * then update it.
 * @param messageCacheStore
 * @param messageId         the message id it will be removed
 * @returns                 *nothing*
 */
export function removeAndUpdateMessage(
  messageCacheStore: MessageCacheStore, 
  messageId: string
) {
  // convert all of the message id from messageCacheStore to an array
  const keys = Array.from(messageCacheStore.keys())
  // grap the message that it will be removed 
  const messageToDelete = document.getElementById(messageId)
  // grap the message bellow the message that it will be removed
  const messageToDeleteIndex = keys.indexOf(messageId)
  const messageOnBottom = document.getElementById(keys[messageToDeleteIndex + 1])
  // update the message of the bottom to a normal message (if needed)
  if (
    !messageToDelete?.classList.contains(MESSAGE_FOLLOW_UP_KEY) &&
    messageOnBottom?.classList.contains(MESSAGE_FOLLOW_UP_KEY)
  ) {
    messageOnBottom.classList.remove(MESSAGE_FOLLOW_UP_KEY)
  }
  // delete it
  messageToDelete?.remove()
  messageCacheStore.delete(messageId)
}