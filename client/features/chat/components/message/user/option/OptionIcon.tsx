import { 
  BsPencilFill, 
  BsReplyFill, 
  BsTrash 
} from "solid-icons/bs"
import { useMessage } from "../../MessageWrapper"
// ...
import stylex from "@stylexjs/stylex"
import { token } from "../token.stylex"

export const enum MessageEditingOption {
  edit,
  reply,
  delete
}

const MessageOptionMapping = {
  [MessageEditingOption.edit]: () => <BsPencilFill />,
  [MessageEditingOption.delete]: () => <BsTrash />,
  [MessageEditingOption.reply]: () => <BsReplyFill />,
}

const style = stylex.create({
  icon: {
    width: token.optionIconBound,
    height: token.optionIconBound,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    ':hover': {
      backgroundColor: 'var(--hope-colors-neutral5)',
    },
    ':first-child': {
      borderTopLeftRadius: token.optionBorderRadius,
      borderBottomLeftRadius: token.optionBorderRadius,
    },
    ':last-child': {
      borderTopRightRadius: token.optionBorderRadius,
      borderBottomRightRadius: token.optionBorderRadius,
    },
    position: 'relative',
    '::before': {
      content: '',
      width: token.optionIconBound,
      height: token.optionIconBound,
      position: 'absolute'
    }
  }
})

export function OptionIcon(props: {
  actionType: MessageEditingOption
}) {
  const Icon = MessageOptionMapping[props.actionType]
  const { messageId } = useMessage()

  return (
    <div 
      {...stylex.props(style.icon)} 
      data-message-option={props.actionType}
      data-message-id={messageId}
    >
      <Icon />
    </div>
  )
}