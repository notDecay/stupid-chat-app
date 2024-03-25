import stylex from "@stylexjs/stylex"
import type { IUserMessageProps } from "../UserMessage"
import { formatDate } from "../../MessageWrapper"
// ...
import { token } from "../token.stylex"
import { Tag } from "@hope-ui/solid"

const style = stylex.create({
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: 15,
    marginBottom: 2
  },
  username: {
    fontSize: token.usernameFontSize
  }
})

export function MessageHeader(props: IUserMessageProps) {
  return (
    <div {...stylex.props(style.header)}>
      <span {...stylex.props(style.username)}>{props.user.name}</span>
      <Tag colorScheme='info' size='sm'>
        {formatDate(props.sentTime)}
      </Tag>
    </div>
  )
}