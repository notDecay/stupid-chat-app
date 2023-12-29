import { Avatar, CloseButton, Divider, Flex, Spacer } from "@hope-ui/solid"
import type { Message } from "../../../api/message/message"

interface IChatMessageReplyToProps
  extends Message.IUserMessage {
  onClose?: () => void
}

export default function ReplyTo(props: IChatMessageReplyToProps) {
  return (
    <Flex px={9} py={5} background="$neutral3" gap={15} fontSize={16} alignItems="center">
      <Avatar boxSize={25} />
      <div>{props.user.name}</div>
      <div>
        <Divider orientation="vertical" thickness="3px" />
      </div>
      <span innerHTML={props.content} />
      <Spacer />
      <CloseButton onClick={props.onClose} />
    </Flex>
  )
}