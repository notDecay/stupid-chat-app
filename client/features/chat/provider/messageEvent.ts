import { MessageType, IMessageReference } from "~/features/chat"
import { EventEmitter } from "~/utils"

/**Enumerates the event names used for chat messages in the application.
 * These events signal actions performed on chat messages, allowing components
 * to subscribe and react accordingly.
 */
export const enum ChatMessageEvent {
  /**A message is about to be updated */
  sendMessage,
  /**Emitted when a user reply to a message */
  replyMessage,
  /**Emitted when a user edit their message */
  editMessage,
  /**Emitted when a user deleted their message */
  deleteMessage,
  /**Emitted when a user has updated their message.
   * 
   * This will not be emitted if user discard changes. 
   */
  updateEditedMessage
}

export interface IUpdateEditedMessageData {
  messageId: string
  oldMessageContent: string
  newMessageContent: string
}

export interface ISendMessageData {
  [MessageType.user]: {
    rawMessageContent: string
    repliedMessageReference: IMessageReference | null
  },
}

export type ChatMessageEventMap = EventEmitter<{
  [ChatMessageEvent.sendMessage]: <
    T extends MessageType
  >(messageType: T, data: ISendMessageData[T]) => any
  [ChatMessageEvent.editMessage]: (messageId: string) => any
  [ChatMessageEvent.replyMessage]: (messageId: string) => any
  [ChatMessageEvent.deleteMessage]: (messageId: string) => any
  [ChatMessageEvent.updateEditedMessage]: (data: IUpdateEditedMessageData) => any
}>