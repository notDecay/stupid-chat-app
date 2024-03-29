import { ChatMessageEvent, MessageEditingOption, useChat } from "~/features/chat"
import { useMessage } from "../../MessageWrapper"
import type { JSX } from "solid-js"
// ...
import { 
  BsPencilFill, 
  BsReplyFill, 
  BsTrash 
} from "solid-icons/bs"
import stylex from "@stylexjs/stylex"
import { token } from "../token.stylex"

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
  const { messageEvent } = useChat()
  const { messageId } = useMessage()

  type OnClickHandler = JSX.EventHandler<HTMLDivElement, MouseEvent>
  const onClickHandler: OnClickHandler = (mouseEvent) => {
    const target = mouseEvent.target
    const editOption = parseInt(
      target.getAttribute('data-message-option') ?? ''
    ) as MessageEditingOption
    if (isNaN(editOption)) {
      return console.log('failed to edit this message')
    }

    switch (editOption) {
      case MessageEditingOption.edit:
        messageEvent.emit(ChatMessageEvent.editMessage, messageId)
      break

      case MessageEditingOption.reply:
        messageEvent.emit(ChatMessageEvent.replyMessage, messageId)
      break
    }
  }

  return (
    <div 
      {...stylex.props(style.icon)} 
      data-message-option={props.actionType}
      onClick={onClickHandler}
    >
      <Icon />
    </div>
  )
}