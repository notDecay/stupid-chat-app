import { EventEmitter } from "~/utils"
import type { IApiChannel, ICachedUserMessage } from "../api"

export const enum ChatEvent {
  /**Emitted when the message page is doing the fetching job
   * from the server.
   */
  messagePageFetching,
  messagePageUpdated,
  inputHideThingsOnTop,
}

export interface IChatMessageUpdateData {
  channel: IApiChannel
  messages: any[]
  input: {
    text: string
    replyTo?: ICachedUserMessage
  }
}

export type ChatEventMap = EventEmitter<{
  [ChatEvent.messagePageFetching]: () => any
  [ChatEvent.messagePageUpdated]: (data: IChatMessageUpdateData) => any
  [ChatEvent.inputHideThingsOnTop]: () => any
}>