import { 
  Avatar, 
  CloseButton, 
  Divider, 
  Spacer 
} from "@hope-ui/solid"
import type { IUserMessage } from "@client/api/message"
import stylex from "@stylexjs/stylex"

const style = stylex.create({
  replyTo: {
    paddingLeft: 9,
    paddingRight: 9,
    paddingTop: 5,
    paddingBottom: 5,
    display: 'flex',
    alignItems: "center",
    gap: 15,
    fontSize: 16,
    backgroundColor: "var(--hope-colors-neutral3)"
  }
})

interface IChatMessageReplyToProps extends IUserMessage {
  onClose?: () => void
}

export default function ReplyTo(props: IChatMessageReplyToProps) {
  return (
    <div {...stylex.props(style.replyTo)}>
      <Avatar boxSize={25} />
      <div>{props.user.name}</div>
      <div>
        <Divider orientation="vertical" thickness="3px" />
      </div>
      <span innerHTML={props.content} />
      <Spacer />
      <CloseButton onClick={props.onClose} />
    </div>
  )
}