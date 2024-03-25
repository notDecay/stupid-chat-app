import stylex from "@stylexjs/stylex"
import { ParentProps, type JSX } from "solid-js"
// ...
import Textarea from "./Textarea"
import { IMessageReference } from "../../api"

const style = stylex.create({
  inputWrapper: {
    position: 'absolute',
    bottom: 0,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    width: `100%`,
  },
  input: {
    backgroundColor: 'var(--hope-colors-neutral2)',
    paddingTop: 7,
    paddingBottom: 7,
    paddingLeft: 15,
    paddingRight: 15,
    display: 'flex',
    alignItems: 'center',
    borderRadius: 8
  }
})

export interface IMessageInputData {
  /**The raw user message which it will be processed and sent to the chat */
  rawMessageContent: string
  /**if the user replied to another message then this will
   * returns the message data of that replied message, `null` otherwise
   */
  repliedMessage?: IMessageReference
}

export interface IMessageInputProps {
  /**Fired when the user send a message
   * @returns *nothing*
   */
  onSending?: (data: IMessageInputData) => any
}

/**Reset the input to original state
 * @param input the current message input
 */
function resetInputHeight(input: HTMLTextAreaElement) {
  input.value = ''
  input.style.height = '33px'
}

type KeydownHandler = JSX.EventHandler<HTMLTextAreaElement, KeyboardEvent>

export function MessageInput(props: ParentProps<IMessageInputProps>) {
  const onKeyDownHandler: KeydownHandler = (keyboardEvent) => {
    const currentTarget = keyboardEvent.currentTarget
    // check if a user tries to send a empty message
    const textInInput = currentTarget.value.trim()
    if (textInInput === '') return false

    // check if a user *actually* sending a message
    const canBeSent = !keyboardEvent.shiftKey && keyboardEvent.key === 'Enter'
    if (!canBeSent) return false

    // preventing the input making new line
    keyboardEvent.preventDefault()
    resetInputHeight(currentTarget)
    
    // call the onSending event itself
    props.onSending?.call(
      // @ts-ignore 
      this, 
      {
        rawMessageContent: textInInput,
      }, 
    )
  }

  return (
    <div {...stylex.props(style.inputWrapper)}>
      {props.children}
      <div {...stylex.props(style.input)}>
        <Textarea onKeyDown={onKeyDownHandler} />
      </div>
    </div>
  )
}