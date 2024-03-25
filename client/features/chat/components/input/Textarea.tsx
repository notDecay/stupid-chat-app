import stylex from "@stylexjs/stylex"
import { JSX } from "solid-js"
import TextareaAutosize from "solid-textarea-autosize"
import { MessageType } from "~/features/chat"

interface ITextareaProps {
  onKeyDown: JSX.EventHandler<HTMLTextAreaElement, KeyboardEvent>
}

const style = stylex.create({
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

export default function Textarea(props: ITextareaProps) {
  return (
    <TextareaAutosize 
      {...stylex.props(style.textarea)} 
      placeholder="Type something..." 
      maxRows={15}
      data-message-type={MessageType.user}
      // value={lastInputText()}
      onKeyDown={props.onKeyDown}
    />
  )
}