import type { IUserMessageProps } from "../UserMessage"
import { MessageContent, MessageHeader, MessageReply } from "../content"
import { Show } from "solid-js"
// ...
import { Avatar } from "@hope-ui/solid"
import { token } from "../token.stylex"
import stylex from "@stylexjs/stylex"

const style = stylex.create({
  avatar: {
    width: token.avatarSize,
    height: token.avatarSize
  },
  messageContent: {
    height: '100%'
  },
  normalMessage: {
    width: '100%'
  },
  normalMessageContent: {
    display: 'flex',
    gap: 15,
  }
})

export function NormalMessage(props: IUserMessageProps) {
  return (
    <div {...stylex.props(style.normalMessage)}>
      <Show when={props.replyTo}>
        <MessageReply replyTo={props.replyTo} />
      </Show>
      
      <div {...stylex.props(style.normalMessageContent)}>
        <Avatar {...stylex.props(style.avatar)} />
        <div {...stylex.props(style.messageContent)}>
          <MessageHeader {...props} />
          <MessageContent {...props} />
        </div>
      </div>
    </div>
  )
}