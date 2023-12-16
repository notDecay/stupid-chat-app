import { Avatar, Flex } from "@hope-ui/solid"
import { IUserMessageProps } from "./UserMessage"

import style from "./MessageReply.module.scss"

interface IMessageReplyProps {
  repliedTo: IUserMessageProps
}

export default function MessageReply(props: IMessageReplyProps) {
  return (
    <div class={style["message-reply"]}>
      <Flex 
        alignItems="center" 
        gap={15} 
        fontSize={16} 
        class={style["content"]}
        color="$neutral11"
      >
        <Avatar boxSize={25} />
        <span>
          {props.repliedTo.content}
        </span>
      </Flex>
    </div>
  )
}