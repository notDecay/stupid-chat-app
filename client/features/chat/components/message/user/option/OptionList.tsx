import { For } from "solid-js"
import type { MessageEditingOption } from "~/features/chat"
// ...
import { token } from "../token.stylex"
import { OptionIcon } from "./OptionIcon"
import stylex from "@stylexjs/stylex"
import __style from "./message.module.css"

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
  }
})

interface IMessageOptionProps {
  options: MessageEditingOption[]
}

export function MessageOptionList(props: IMessageOptionProps) {
  return (
    <div class={__style["message-option"]}>
      <div {...stylex.props(style.option)} >
        <For each={props.options}>
          {it => <OptionIcon actionType={it} />}
        </For>
      </div>
    </div>
  )
}