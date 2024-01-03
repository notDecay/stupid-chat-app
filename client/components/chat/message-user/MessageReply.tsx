import { 
  Avatar, 
  Flex 
} from "@hope-ui/solid"
import type { IUserMessageProps } from "."

interface IMessageReplyProps {
  repliedTo: IUserMessageProps
}

export default function MessageReply(props: IMessageReplyProps) {
  return (
    <div class="message-reply">
      <Flex 
        alignItems="center" 
        gap={15} 
        fontSize={16} 
        class="content"
        color="$neutral11"
      >
        <Avatar boxSize={25} />
        <span innerHTML={props.repliedTo.content} />
      </Flex>
    </div>
  )
}