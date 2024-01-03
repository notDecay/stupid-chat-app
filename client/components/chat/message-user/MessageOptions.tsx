import { Center, Flex } from "@hope-ui/solid"
import { For, type JSX, type ParentProps } from "solid-js"

import style from "./MessageOptions.module.scss"
import { 
  BsReplyFill, 
  BsTrashFill 
} from "solid-icons/bs"
import { MessageActions } from "../message/actions"

namespace MessageOption {
  export function Option(props: ParentProps<{
    onClick: JSX.EventHandler<HTMLDivElement, MouseEvent>
  }>) {
    return (
      <div class={style["message-options"]} onClick={props.onClick}>
        <Flex class={style.wrapper} background="$neutral5">
          {props.children}
        </Flex>
      </div>
    )
  }

  interface IMessageItemProps {
    action: MessageActions
  }

  export function Item(props: ParentProps<IMessageItemProps>) {
    return (
      <Center class={style["item"]} boxSize={30} data-action={props.action}>
        {props.children}
      </Center>
    )
  }

  export const ItemMap = {
    [MessageActions.Reply]: () => <BsReplyFill />,
    [MessageActions.Delete]: () => <BsTrashFill />
  }
}

interface IMessageOptionProps {
  /**Fired whenever a option has been clicked. 
   * @param action Currently these option are `"reply"`, `"delete"`  
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
    <MessageOption.Option onClick={onClickHandler}>
      <For each={props.actions}>
        {it => {
          const Icon = MessageOption.ItemMap[it]
          return (
            <MessageOption.Item action={it}>
              <Icon />
            </MessageOption.Item>
          )
        }}
      </For>
    </MessageOption.Option>
  )
}