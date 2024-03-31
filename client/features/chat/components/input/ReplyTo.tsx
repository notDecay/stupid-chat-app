import type { ICachedUserMessage } from "../../api"
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
  data: ICachedUserMessage
}

export function ReplyTo(props: IReplyToProps) {
  return (
    <div {...stylex.props(style.replyTo)}>
      <div {...stylex.props(style.content)}>
        Reply to
        <div {...stylex.props(style.repliedUser)}>
          <Avatar boxSize={20} src={props.data.user.iconUrl} />
          <span>{props.data.user.name}</span>
        </div>
        <span>
          {props.data.content}
        </span>
        <Spacer />
      </div>
      <div>
        <CircleButton 
          boxSize={15} 
          buttonVariant="square"
          {...stylex.props(style.closeButton)} 
          onClick={props.onClose}
        />
      </div>
    </div>
  )
}