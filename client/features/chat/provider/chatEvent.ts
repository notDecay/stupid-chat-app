import { EventEmitter } from "~/utils"
import { IApiChannel } from "../api"

export const enum ChatEvent {
  /**Emitted when the message page is doing the fetching job
   * from the server.
   * 
   */
  messagePageFetching,
  messagePageUpdated,
  inputHideThingsOnTop,
}

export interface IChatMessageUpdateData {
  channel: IApiChannel
  messages: any[]
}

export type ChatEventMap = EventEmitter<{
  [ChatEvent.messagePageFetching]: () => any
  [ChatEvent.messagePageUpdated]: (data: IChatMessageUpdateData) => any
  [ChatEvent.inputHideThingsOnTop]: () => any
}>