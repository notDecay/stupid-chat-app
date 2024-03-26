import { createStore } from "solid-js/store"
import type { AnyCachedMessage } from "../api"
import { TwoLevelDeepMap } from "./TwoLevelDeepMap"
import type { IChatMessageUpdateData } from "../provider"

export const store = {
  message: new TwoLevelDeepMap<string, AnyCachedMessage>(),
  /**Stores the current channel data. 
   * 
   * This will automatically being updated via `updateChatMessageIfNeed()` function
   * @see {@link updateChatMessageIfNeed()}
   */
  currentChannel: createStore({} as IChatMessageUpdateData),
}