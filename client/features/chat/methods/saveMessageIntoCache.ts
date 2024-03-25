import { AnyCachedMessage } from "../api";
import { messageStore } from "../storage";

export function saveMessageIntoCache(currentChannel: string, message: AnyCachedMessage) {
  messageStore.set(currentChannel, message)
}