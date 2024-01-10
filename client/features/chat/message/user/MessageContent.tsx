import stylex from "@stylexjs/stylex"
import type { IUserMessageProps } from "."

const style = stylex.create({
  content: {
    backgroundColor: 'var(--hope-colors-neutral3)',
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 1,
    paddingBottom: 1,
    borderRadius: 8,
    wordBreak: 'break-all'
  }
})

export default function MessageContent(props: IUserMessageProps) {
  return (
    <div {...stylex.props(style.content)} innerHTML={props.content} />
  )
}