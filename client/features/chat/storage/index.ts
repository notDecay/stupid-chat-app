import { createStore } from "solid-js/store"
import type { AnyCachedMessage, IApiChannel, IApiUser } from "../api"
import { TwoLevelDeepMap } from "./TwoLevelDeepMap"
import type { IChatMessageUpdateData } from "../provider"
import type { IChannelsStoreData } from "../methods"

export const store = {
  message: new TwoLevelDeepMap<string, AnyCachedMessage>(),
  /**Stores the current channel data. 
   * 
   * This will automatically being updated via `updateChatMessageIfNeed()` function
   * @see {@link updateChatMessageIfNeed()}
   */
  currentChannel: createStore({} as IChatMessageUpdateData),
  /**Store containing an array of channels accessible in the chat. */
  channels: createStore([] as IChannelsStoreData[]),
  user: createStore({} as IApiUser)
}