import { store } from "../storage"

export function getCurrentChannel() {
  return store.currentChannel[0]
}