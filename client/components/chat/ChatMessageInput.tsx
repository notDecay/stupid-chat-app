import { Button, Center, Flex, textareaStyles } from "@hope-ui/solid"
import TextareaAutosize from "solid-textarea-autosize"
import { BsPlus } from "solid-icons/bs"
import type { JSX, ParentProps } from "solid-js"

import style from "./ChatMessageInput.module.scss"

interface IChatMessageInputProps {
  /**Fired whenever a user send a message, if 3 of these condition are met
   * - you press the `Enter` key
   * - you does not hold the `shift` key 
   * (`shift + Enter` make a new line on the message input) 
   * - the input is not empty
   * (if it's not then it just make a new lines)
   * @param messageContent the raw message content (haven't been processed yet)
   * @returns              *nothing*
   */
  onSendingMessage: (messageContent: string) => any
}

/**
 * Maximum message rows before it does not resize anymore
 */
const MESSAGE_ROW_LIMIT = 25
const TEXTAREA_PLACEHOLDER = "Type something..."

export default function ChatMessageInput(props: ParentProps<IChatMessageInputProps>) {
  type InputHandler = JSX.EventHandler<HTMLTextAreaElement, KeyboardEvent>
  const keyboardHandler: InputHandler = (keyboardEvent) => {
    const thisInput = keyboardEvent.target as HTMLTextAreaElement
    const canBeAbleToSend = 
      keyboardEvent.key === "Enter" &&
      !keyboardEvent.shiftKey &&
      thisInput.value.trim() != ''
    if (canBeAbleToSend) {
      keyboardEvent.preventDefault()
      props.onSendingMessage(thisInput.value)
      thisInput.value = ''
      thisInput.style.height = '34px' // <= I guess this value out :)
    }
  }

  return (
    <Flex class={style["chat-msg-input-wrapper"]}>
      <Center class={style["msg-input-wrapper"]} background="$neutral2" gap={15}>
        <MoreOptions />
        <TextareaAutosize 
          class={textareaStyles()} 
          maxRows={MESSAGE_ROW_LIMIT} 
          placeholder={TEXTAREA_PLACEHOLDER}
          minRows={1}
          onKeyDown={keyboardHandler}
        />
      </Center>
    </Flex>
  )
}

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