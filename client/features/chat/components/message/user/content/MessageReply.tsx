import { 
  type ICachedUserMessage, 
} from "~/features/chat"
// ...
import { Avatar } from "@hope-ui/solid"
import stylex from "@stylexjs/stylex"
import { token } from "../token.stylex"

const style = stylex.create({
  reply: {
    display: 'flex',
    alignItems: 'center',
    paddingBlock: 5,
    paddingInline: 8,
    gap: 15,
    backgroundColor: 'var(--hope-colors-neutral4)',
    borderRadius: 8
  },
  username: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    fontSize: token.usernameFontSize
  },
  messageContent: {
    opacity: 0.75
  }
})

interface IMessageReplyProps {
  replyTo?: ICachedUserMessage["replyTo"]
}

export function MessageReply(props: IMessageReplyProps) {
  return (
    <div {...stylex.props(style.reply)}>
      <div {...stylex.props(style.username)}>
        <Avatar boxSize={21} src={props.replyTo?.user.iconUrl} />
        <span>
          {props.replyTo?.user.name}
        </span>
      </div>
      <div {...stylex.props(style.messageContent)}>
        {props.replyTo?.content}
      </div>
    </div>
  )
}