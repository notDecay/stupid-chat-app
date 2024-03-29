import { MessageInput as _MessageInput } from "./MessageInput"
import { ReplyTo } from "./ReplyTo"

export const MessageInput = {
  Input: _MessageInput,
  ReplyTo
}

/**Interface represent for the options to show the component that on top
 * of this message input
 */
export interface IMessageInputAccessoryOptions {
  option: number
  data?: object
}

export type * from "./MessageInput"