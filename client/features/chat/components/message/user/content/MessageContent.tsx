import type { IUserMessageProps } from "../UserMessage"
import { Markdown } from "~/features/markdown"
// ...
import stylex from "@stylexjs/stylex"

const style = stylex.create({
  content: {
    backgroundColor: 'var(--hope-colors-neutral3)',
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 1,
    paddingBottom: 1,
    borderRadius: 8,
    wordBreak: 'break-all'
  },
  editingPrompt: {
    width: '100%',
    resize: 'none',
    border: '2px solid #f5b642',
    backgroundColor: 'var(--hope-colors-neutral3)',
    color: 'var(--hope-colors-neutral12)',
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 5,
    paddingBottom: 5,
  }
})

export function MessageContent(props: IUserMessageProps) {
  return (
    <div {...stylex.props(style.content)}>
      <Markdown>
        {props.content}
      </Markdown>
    </div>
  )
}