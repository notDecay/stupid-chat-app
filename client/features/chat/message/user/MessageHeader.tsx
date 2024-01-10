import stylex from "@stylexjs/stylex"
import type { IUserMessageProps } from "."

const style = stylex.create({
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: 15
  }
})

export default function MessageHeader(props: IUserMessageProps) {
  return (
    <div {...stylex.props(style.header)}>
      <span>{props.user.name}</span>
    </div>
  )
}