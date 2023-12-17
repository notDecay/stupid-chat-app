import { Avatar, Button, Center, CloseButton, Divider, Flex, Spacer, textareaStyles } from "@hope-ui/solid"
import TextareaAutosize from "solid-textarea-autosize"
import type { ParentProps } from "solid-js"
import { BsPlus } from "solid-icons/bs"
import { Message } from "../../utils"

import style from "./index.module.scss"
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

  /**Maximum message rows before it does not resize anymore */
  const MESSAGE_ROW_LIMIT = 25
  /**The placeholder text of the message input */
  const TEXTAREA_PLACEHOLDER = "Type something..."

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
            placeholder={TEXTAREA_PLACEHOLDER}
            onKeyDown={e => keyboardHandler(e, () => {
              props.onSendingMessage(e.currentTarget.value)
            })}
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
    canBeAbleToSend: () => void
  ) {
    const thisInput = keyboardEvent.currentTarget as HTMLTextAreaElement
    const canBeSend = (
      keyboardEvent.key === "Enter" &&
      !keyboardEvent.shiftKey &&
      thisInput.value.trim() != ''
    )
    if (!canBeSend) return 
    keyboardEvent.preventDefault()
    canBeAbleToSend()
    thisInput.value = ''
    thisInput.style.height = '34px' // <= I guess this value out :)
  }

  /**Creates the message input more options button
   * @returns JSX element
   * @component
   */
  function MoreOptions() {
    return (
      <div class={style["more-options-wrapper"]}>
        <Button
          class={style["more-options"]} 
          boxSize={35} 
          background="$neutral4"
          as={Center}
          colorScheme="neutral"
        >
          <BsPlus size={25} />
        </Button>
      </div>
    )
  }

  interface IChatMessageReplyToProps
    extends Message.IUserMessage {
    onClose?: () => void
  }

  /**Uhhh, idk how to explain this component, see the example :)
   * @example
   * ```
   * import { createSignal } from "solid-js"
   * 
   * function Component() {
   *   const [replyToMessage, setReplyToMessage] = createSignal()
   *   const sendMessageHandler = (messageContent: string) => {
   *     // do something with the messageContent
   *     // ...
   *     // then whenever a user hit the reply button...
   *     // get that message reply somewhere
   *     // set to here
   *     setReplyToMessage(message)
   *   }
   * 
   *   return (
   *     <ChatMessageInput.Input onSendingMessage={sendMessageHandler}>
   *       <ChatMessageInput.ReplyTo {...replyToMessage()} />
   *     </ChatMessageInput.Input>
   *   )
   * }
   * ```
   * @param props see {@link Message.IUserMessage} for its props
   * @returns     JSX element
   * @see {@link Input} component
   * @component
   */
  export function ReplyTo(props: IChatMessageReplyToProps) {
    return (
      <Flex px={9} py={5} background="$neutral3" gap={15} fontSize={16} alignItems="center">
        <Avatar boxSize={25} />
        <div>{props.user.name}</div>
        <div>
          <Divider orientation="vertical" thickness="3px" />
        </div>
        <span innerHTML={props.content} />
        <Spacer />
        <CloseButton onClick={props.onClose} />
      </Flex>
    )
  }
}

export default ChatMessageInput