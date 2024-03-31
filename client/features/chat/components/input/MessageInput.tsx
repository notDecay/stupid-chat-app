import stylex from "@stylexjs/stylex"
import { 
  type JSX, 
  type ParentProps 
} from "solid-js"
import { store } from "../../storage"
// ...
import Textarea from "./Textarea"
import type { 
  IMessageReference 
} from "../../api"
import type { 
  MessageInputAccessoryOptions 
} from "./MessageInputAccessory"
import { inputAccessoryState, MessageInputAccessory } from "./MessageInputAccessory"

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

/**Interface representing the data sent by the `<MessageInput />` component. */
export interface IMessageInputData {
  /**The raw user message content before processing and sending to the chat. */
  rawMessageContent: string
  /**Reference to the replied message data if the user is replying to another message, 
   * otherwise null.
   */
  repliedMessage?: IMessageReference
}

/**Interface representing the props accepted by the `<MessageInput />` component. */
export interface IMessageInputProps {
  /**Fired when the user send a message
   * @param data The message data to be sent.
   * @returns *nothing*
   * 
   * @see {@link IMessageInputData}
   */
  onSending?: (data: IMessageInputData) => any
  /**The message input accessory to display, which it will show on top of the message input. 
   * 
   * @see {@link MessageInputAccessoryOptions}
   * @see {@link AccessoryOptions}
   */
  accessory: MessageInputAccessoryOptions
}

/**Not so "complex" chat message input. Yep, trust me :)
 * 
 * @param props The properties configuring the message input component. See {@link IMessageInputProps}
 * @returns The `JSX.Element` representing the message input component.
 */
export function MessageInput(props: ParentProps<IMessageInputProps>) {
  type KeyboardHandler = JSX.EventHandler<HTMLTextAreaElement, KeyboardEvent>

  const [currentChannel] = store.currentChannel
  const onKeyDownHandler: KeyboardHandler = (keyboardEvent) => {
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
    const [replyTo, setReplyTo] = inputAccessoryState.replyTo
    console.log('replied message is', replyTo()[1])

    props.onSending?.call(
      // @ts-ignore 
      this, 
      {
        rawMessageContent: textInInput,
        repliedMessage: replyTo()[1],
      }, 
    )

    setReplyTo([false, undefined])
  }

  const resetInputHeight = (input: HTMLTextAreaElement) => {
    input.value = ''
    input.style.height = '33px'
  }

  // ...
  return (
    <div {...stylex.props(style.inputWrapper)}>
      <MessageInputAccessory 
        accessory={props.accessory} 
        currentChannelStore={store.currentChannel} 
      />
      <div {...stylex.props(style.input)}>
        <Textarea onKeyDown={onKeyDownHandler} />
      </div>
    </div>
  )
}