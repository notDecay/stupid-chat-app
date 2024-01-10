import stylex from "@stylexjs/stylex"
import __style from "./message.module.css"
import { MessageAction, MessageOptionMapping } from "./MessageOptionMapping"
import { For, JSX } from "solid-js"
import { styleToken } from "../../../../utils"
import { token } from "./token.stylex"
import { ChatMessageEvent, useChatMessage } from "../../../../provider/chat/ChatMessageProvider"

const style = stylex.create({
  option: {
    position: 'absolute',
    right: 0,
    bottom: 25,
    marginRight: 25,
    backgroundColor: 'var(--hope-colors-neutral3)',
    borderRadius: token.optionBorderRadius,
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer'
  },
  icon: {
    width: token.optionIconBound,
    height: token.optionIconBound,
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
    }
  }
})

interface IMessageOptionProps {
  actions: MessageAction[]
  messageId: string
}

export default function MessageOption(props: IMessageOptionProps) {
  const { event } = useChatMessage()

  type OnClickHandler = JSX.EventHandler<HTMLDivElement, MouseEvent>
  const onClickHandler: OnClickHandler = (mouseEvent) => {
    const currentTarget = mouseEvent.target as HTMLDivElement
    const option: MessageAction = parseInt(currentTarget.getAttribute('data-action')!)
    event.emit(ChatMessageEvent.messageOptionClicked, option, props.messageId)
  }

  return (
    <div class={__style["message-option"]}>
      <div {...stylex.props(style.option)} >
        <For each={props.actions}>
          {it => {
            const Icon = MessageOptionMapping[it]
            return (
              <div {...stylex.props(
                style.icon,
                styleToken.flexCenter
              )} onClick={onClickHandler}>
                <Icon />
              </div>
            )
          }}
        </For>
      </div>
    </div>
  )
}