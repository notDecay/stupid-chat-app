import type { AnyCachedMessage } from "../api"
import { TwoLevelDeepMap } from "./TwoLevelDeepMap"

export const messageStore = new TwoLevelDeepMap<string, AnyCachedMessage>()