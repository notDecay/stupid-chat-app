import { MessageType, IMessageReference } from "~/features/chat"
import { EventEmitter } from "~/utils"

/**Enumerates the event names used for chat messages in the application.
 * These events signal actions performed on chat messages, allowing components
 * to subscribe and react accordingly.
 */
export const enum ChatMessageEvent {
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

/**Interface defining the data structure for update edited message event. */
export interface IUpdateEditedMessageData {
  /**Unique id of the message. */
  messageId: string
  /**Content of the message before the edit. */
  oldMessageContent: string
  /**Content of the message after the edit. */
  newMessageContent: string
}

/**Interface defining the data structure for send message event based on message type. */
export interface ISendMessageData {
  [MessageType.user]: {
    /**The unprocessed content of the message. */
    rawMessageContent: string
    /**A reference to the replied message, if applicable. */
    repliedMessageReference: IMessageReference | null
  },
}

/**Type definition for the event mapping to the {@link ChatMessageEvent}. */
export type ChatMessageEventMap = EventEmitter<{
  [ChatMessageEvent.editMessage]: (messageId: string) => any
  [ChatMessageEvent.replyMessage]: (messageId: string) => any
  [ChatMessageEvent.deleteMessage]: (messageId: string) => any
  [ChatMessageEvent.updateEditedMessage]: (data: IUpdateEditedMessageData) => any
}>