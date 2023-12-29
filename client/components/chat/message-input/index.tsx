import { 
  Center, 
  Flex, 
  textareaStyles 
} from "@hope-ui/solid"
import TextareaAutosize from "solid-textarea-autosize"
import { type ParentProps } from "solid-js"

import style from "./index.module.scss"

import MoreOptions from "./MoreOptions"
import _ReplyTo from "./ReplyTo"

namespace ChatMessageInput {
  interface IChatMessageInputProps {
    /**Fired whenever a user send a message, if 3 of these condition are met
     * - you press the `Enter` key
     * - you does not hold the `shift` key 
     * (`shift + Enter` make a new line on the message input) 
     * - the input is not empty
     * (if it's not then it just make a new lines)
     * @param messageContent the raw message content (haven't been processed yet)
     * @returns              *nothing*
     * @event
     */
    onSendingMessage: (messageContent: string) => any
  }
  
  const MESSAGE_ROW_LIMIT = 25
  const INPUT_PLACEHOLDER = "Type something..."
  
  /**Creates the message input
   * @param props see this interface {@link IChatMessageInputProps} for its props :)
   * - `props.children`: used to display stuff on top of the input itself
   * (eg. reply to, `...`)
   * @returns     JSX element
   * @component
   */
  export function Input(props: ParentProps<IChatMessageInputProps>) {
    return (
      <Flex class={style["chat-msg-input-wrapper"]} flexDirection="column">
        <div class={style["stuff-on-top"]}>{props.children}</div>
        <Center class={style["msg-input-wrapper"]} background="$neutral2" gap={15}>
          <MoreOptions />
          <TextareaAutosize 
            class={textareaStyles()} 
            maxRows={MESSAGE_ROW_LIMIT} 
            placeholder={INPUT_PLACEHOLDER}
            onKeyDown={e => keyboardHandler(e, (rawMessageContent) => {
              props.onSendingMessage(rawMessageContent)
            })}
            id="message-input"
          />
        </Center>
      </Flex>
    )
  }
  
  /**Handle message input
   * @param keyboardEvent     the keyboard event itself
   * @param canBeAbleToSend   a callback function that fired whenever it can be send or not.
   * the following condition must be met:
   * - you press the `Enter` key
   * - you does not hold the `shift` key 
   * (`shift + Enter` make a new line on the message input) 
   * - the input is not empty
   * (if it's not then it just make a new lines)
   * @returns                 *nothing*
   */
  function keyboardHandler(
    keyboardEvent: KeyboardEvent, 
    canBeAbleToSend: (rawMessageContent: string) => void
  ) {
    const thisInput = keyboardEvent.currentTarget as HTMLTextAreaElement
    const messageContent = thisInput.value.trim()
    const canBeSend = (
      keyboardEvent.key === "Enter" &&
      !keyboardEvent.shiftKey &&
      messageContent != ''
    )
    if (!canBeSend) return 
    keyboardEvent.preventDefault()
    canBeAbleToSend(messageContent)
    thisInput.value = ''
    thisInput.style.height = '34px' // <= I guess this value out :)
  }

  // components that used (show on the top of the message input)
  export const ReplyTo = _ReplyTo
}

export default ChatMessageInput