import stylex from "@stylexjs/stylex"
import { token } from "../token.stylex"
import type { IUserMessageProps } from "../UserMessage"
import { MessageContent } from "../content"

const style = stylex.create({
  followUpMessage: {
    paddingLeft: `calc(${token.avatarSize} + 15px)`
  },
})

export function FollowUpMessage(props: IUserMessageProps) {
  return (
    <div {...stylex.props(style.followUpMessage)}>
      <MessageContent {...props} />
    </div>
  )
}