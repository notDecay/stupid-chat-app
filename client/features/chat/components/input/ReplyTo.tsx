import { ICachedUserMessage } from "../../api"
import { Show } from "solid-js"
// 
import stylex from "@stylexjs/stylex"
import { Avatar, Spacer } from "@hope-ui/solid"
import { CircleButton } from "~/components"

const style = stylex.create({
  replyTo: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'var(--hope-colors-neutral3)',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    color: 'var(--hope-colors-neutral11)',
  },
  content: {
    display: 'flex',
    paddingBlock: 5,
    paddingInline: 10,
    gap: 15,
    width: '100%'
  },
  repliedUser: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    color: 'var(--hope-colors-neutral12)',
  },
  closeButton: {
    marginRight: 15,
    paddingBlock: 14,
    backgroundColor: 'var(--hope-colors-neutral5)',
  }
})

interface IReplyToProps {
  onClose?: () => void
  repliedMessage: ICachedUserMessage | null
}

export function ReplyTo(props: IReplyToProps) {
  return (
    <Show when={props.repliedMessage}>
      <div {...stylex.props(style.replyTo)}>
        <div {...stylex.props(style.content)}>
          Reply to
          <div {...stylex.props(style.repliedUser)}>
            <Avatar boxSize={20} src={props.repliedMessage?.user.iconUrl} />
            <span>{props.repliedMessage?.user.name}</span>
          </div>
          <span>
            {props.repliedMessage?.content}
          </span>
          <Spacer />
        </div>
        <div>
          <CircleButton 
            boxSize={15} 
            buttonVariant="square"
            {...stylex.props(style.closeButton)} 
          />
        </div>
      </div>
    </Show>
  )
}