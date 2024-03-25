import { ICachedUserMessage } from "../../api"
import { Show } from "solid-js"
// 
import stylex from "@stylexjs/stylex"
import { Avatar, Spacer } from "@hope-ui/solid"
import { CircleButton } from "~/components"

const style = stylex.create({
  replyTo: {
    display: 'flex',
    alignItems: 'center',
    paddingBlock: 5,
    paddingInline: 10,
    gap: 15,
    backgroundColor: 'var(--hope-colors-neutral3)',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    color: 'var(--hope-colors-neutral11)',
  },
  repliedUser: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    color: 'var(--hope-colors-neutral12)',
  },
})

interface IReplyToProps {
  onClose?: () => void
  repliedMessage: ICachedUserMessage | null
}

export function ReplyTo(props: IReplyToProps) {
  return (
    <Show when={props.repliedMessage}>
      <div {...stylex.props(style.replyTo)}>
        Reply to
        <div {...stylex.props(style.repliedUser)}>
          <Avatar boxSize={20} src={props.repliedMessage?.user.iconUrl} />
          <span>{props.repliedMessage?.user.name}</span>
        </div>
        <span>
          {props.repliedMessage?.content}
        </span>
        <Spacer />
        <div>
          <CircleButton boxSize={15} onClick={props.onClose} />
        </div>
      </div>
    </Show>
  )
}