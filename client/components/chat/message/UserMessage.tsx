import { Show } from "solid-js"
import {
  mergeClassNames 
} from "../../../utils"
import { 
  Avatar, 
  Box, 
  Flex, 
  Heading, 
  Tag 
} from "@hope-ui/solid"
import MessageWrapUp from "./MessageWrapUp"
import MessageOptions from "./MessageOptions"
import { 
  ChatMessageEvents, 
  useChatMessages 
} from "../../provider/ChatMessagesProvider"
import { MESSAGE_FOLLOW_UP_KEY } from "."
import { Message } from "../message-list/message"

import "./UserMessage.scss"

namespace UserMessage {
  export interface IUserMessageProps 
    extends Omit<Message.IUserMessage, "replyTo"> {
    isFollowUp?: boolean
    // override
    replyTo?: this
  }

  export function Message(props: IUserMessageProps) {
    const { event } = useChatMessages()
  
    let shouldFollowUp = props.isFollowUp
    if (props.replyTo) {
      shouldFollowUp = false
    }

    const optionClickedHandler = (
      action: import("./MessageOptions").MessageOptions
    ) => {
      event.emit(ChatMessageEvents.messageOptionClicked, action, props.id)
    }
  
    return (
      <MessageWrapUp 
        id={props.id} 
        class={mergeClassNames("user-message", shouldFollowUp ? MESSAGE_FOLLOW_UP_KEY : '')}
      >
        <Show when={props.replyTo}>
          <MessageReply repliedTo={props.replyTo!} />
        </Show>
        <Flex alignItems="center" gap={15}>
          <Avatar class="avatar" />
          <MessageContent {...props} />
          <MessageOptions onOptionClicked={optionClickedHandler} />
        </Flex>
      </MessageWrapUp>
    )
  }

  function MessageContent(props: IUserMessageProps) {
    return (
      <div class="message-content">
        <MessageDate {...props} />
        <Box 
          backgroundColor="$neutral4" 
          px="8px" 
          class="content"
          innerHTML={props.content}
        />
      </div>
    )
  }

  function MessageDate(props: IUserMessageProps) {
    const formatedDate = new Intl.DateTimeFormat("default", {
      hour: "numeric",
      minute: "numeric",
      dayPeriod: "short"
    }).format(new Date(props.sendTime))

    const formatedDateButShorter = new Intl.DateTimeFormat("default", {
      hour: "numeric",
      minute: "numeric",
    }).format(new Date(props.sendTime))

    const [hours] = formatedDateButShorter.split(":").map(it => parseInt(it))

    return (
      <>
        <Box class="date" color="$neutral11" marginRight={hours >= 10 ? 8 : 13}>
          {formatedDateButShorter}
        </Box>
        <Flex fontSize="$xs" gap={15} alignItems="center" marginBottom={5} class="username">
          <Heading size="sm">
            {props.user.name}
          </Heading>
          <Tag as={Flex} size="sm" alignItems="center" color="$neutral11" gap={15}>
            {formatedDate}
            <Box class="date-time date-moon" boxSize={12} />
          </Tag>
        </Flex>
      </>
    )
  }

  interface IMessageReplyProps {
    repliedTo: IUserMessageProps
  }

  function MessageReply(props: IMessageReplyProps) {
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
}

export default UserMessage