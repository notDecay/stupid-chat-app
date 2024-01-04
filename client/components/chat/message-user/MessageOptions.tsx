import { Center, Flex } from "@hope-ui/solid"
import { For, type JSX } from "solid-js"

import style from "./MessageOptions.module.scss"
import { 
  BsReplyFill, 
  BsTrashFill 
} from "solid-icons/bs"
import { MessageActions } from "../message/actions"

const iconMap = {
  [MessageActions.Reply]: () => <BsReplyFill />,
  [MessageActions.Delete]: () => <BsTrashFill />
}

interface IMessageOptionProps {
  /**Fired whenever a option has been clicked. 
   * @param action see {@link MessageActions}
   * @returns      *nothing*
   */
  onOptionClicked: (action: MessageActions) => any
  actions: MessageActions[]
}

export default function MessageOptions(props: IMessageOptionProps) {
  type OnClickHandler = JSX.EventHandler<HTMLDivElement, MouseEvent>
  const onClickHandler: OnClickHandler = (mouseEvent) => {
    const target = mouseEvent.target
    let action: string | MessageActions | null = target.getAttribute("data-action")
    if (!action) return

    action = parseInt(action)

    props.onOptionClicked.call(this, action)
  }

  return (
    <div class={style["message-options"]} onClick={onClickHandler}>
      <Flex class={style.wrapper} background="$neutral5">
        <For each={props.actions}>
          {it => <OptionIcon action={it} />}
        </For>
      </Flex>
    </div>
  )
}

interface IOptionIconProps {
  action: MessageActions
}

function OptionIcon(props: IOptionIconProps) {
  const Icon = iconMap[props.action]
  return (
    <Center class={style["item"]} boxSize={30} data-action={props.action}>
      <Icon />
    </Center>
  )
}