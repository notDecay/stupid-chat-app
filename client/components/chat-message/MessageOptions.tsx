import { Center, Flex } from "@hope-ui/solid"
import type { JSX, ParentProps } from "solid-js"

import style from "./MessageOptions.module.scss"
import { 
  BsReplyFill, 
  BsTrashFill 
} from "solid-icons/bs"

type MessageOption = "reply" | "delete"
interface IMessageOptionProps {
  /**Fired whenever a option has been clicked. 
   * @param action Currently these option are `"reply"`, `"delete"`  
   * @returns      *nothing*
   */
  onOptionClicked: (action: MessageOption) => any
}

interface IMessageItemProps {
  action: MessageOption
}

const MessageOption = {
  Option(props: ParentProps<{
    onClick: JSX.EventHandler<HTMLDivElement, MouseEvent>
  }>) {
    return (
      <div class={style["message-options"]} onClick={props.onClick}>
        <Flex class={style.wrapper} background="$neutral5">
          {props.children}
        </Flex>
      </div>
    )
  },

  Item(props: ParentProps<IMessageItemProps>) {
    return (
      <Center class={style["item"]} boxSize={30} data-action={props.action}>
        {props.children}
      </Center>
    )
  }
}

export default function MessageOptions(props: IMessageOptionProps) {
  return (
    <MessageOption.Option onClick={(e) => {
      const target = e.target
      const action = target.getAttribute("data-action")
      if (!action) return

      props.onOptionClicked.call(this, action)
    }}>
      <MessageOption.Item action="reply">
        <BsReplyFill />
      </MessageOption.Item>
      <MessageOption.Item action="delete">
        <BsTrashFill />
      </MessageOption.Item>
    </MessageOption.Option>
  )
}