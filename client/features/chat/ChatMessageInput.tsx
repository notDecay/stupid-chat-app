import stylex from "@stylexjs/stylex"
import TextareaAutosize from "solid-textarea-autosize"
import { ChatMessageEvent, useChatMessage } from "../../provider/chat/ChatMessageProvider"
import { createSignal, type JSX } from "solid-js"
import { MessageAction } from "./message/user/MessageOptionMapping"

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
  },
  textarea: {
    paddingTop: 7,
    paddingBottom: 7,
    outline: 'none',
    backgroundColor: 'transparent',
    resize: 'none',
    color: 'var(--hope-colors-neutral12)',
    width: '100%'
  }
})

interface IChatMessageInputProps {
  onSendingMessage: (messageContent: string) => any
}

export function ChatMessageInput(props: IChatMessageInputProps) {
  const [lastInputText, setLastInputText] = createSignal('')
  const { channel, event } = useChatMessage()

  event.on(ChatMessageEvent.update, ({ lastInputText }) => {
    setLastInputText(lastInputText)
  })

  event.on(ChatMessageEvent.messageOptionClicked, (option, messageId) => {
    if (option !== MessageAction.reply) return
  })

  type OnKeyDownHandler = JSX.EventHandler<HTMLTextAreaElement, KeyboardEvent>
  const onKeyDownHandler: OnKeyDownHandler = (keyboardEvent) => {
    const currentTarget = keyboardEvent.target as HTMLTextAreaElement
    const textInTheInput = currentTarget.value.trim()
    sessionStorage.setItem(`last_input_text_${channel?.id}`, currentTarget.value)

    const canBeSent = keyboardEvent.key == 'Enter' && !keyboardEvent.shiftKey
    const inputMustHaveSomethingInIt = textInTheInput !== ''

    if (canBeSent && inputMustHaveSomethingInIt) {
      keyboardEvent.preventDefault()
      props.onSendingMessage(textInTheInput)
      currentTarget.value = ''
      // I hard-coded this value :)
      currentTarget.style.height = '33px'
    }
  }

  return (
    <div {...stylex.props(style.inputWrapper)}>
      <div></div>
      <div {...stylex.props(style.input)}>
        <TextareaAutosize 
          {...stylex.props(style.textarea)} 
          placeholder="Type something..." 
          maxRows={15}
          value={lastInputText()}
          onKeyDown={onKeyDownHandler}
        />
      </div>
    </div>
  )
}