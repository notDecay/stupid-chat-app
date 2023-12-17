import { Show } from "solid-js"
import {
  Message, 
  mergeClassNames 
} from "../../utils"
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
} from "../provider/ChatMessagesProvider"
import { MESSAGE_FOLLOW_UP_KEY } from "."

import "./UserMessage.scss"

namespace UserMessage {
  export interface IUserMessageProps extends Omit<Message.IUserMessage, "replyTo"> {
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
          <Reply repliedTo={props.replyTo!} />
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
    const formatedDate = new Intl.DateTimeFormat("default", {
      hour: "numeric",
      minute: "numeric",
      dayPeriod: "short"
    }).format(props.sendTime)

    const formatedDateButShorter = new Intl.DateTimeFormat("default", {
      hour: "numeric",
      minute: "numeric",
    }).format(props.sendTime)
    
    return (
      <div class="message-content">
        <Box class="date" color="$neutral11">
          {formatedDateButShorter}
        </Box>
        <Flex fontSize="$xs" gap={15} alignItems="center" marginBottom={5} class="username">
          <Heading size="sm">
            {props.user.name}
          </Heading>
          <Tag size="sm">
            {formatedDate}
          </Tag>
        </Flex>
        <Box 
          backgroundColor="$neutral4" 
          px="8px" 
          class="content"
          innerHTML={props.content}
        />
      </div>
    )
  }

  interface IMessageReplyProps {
    repliedTo: IUserMessageProps
  }

  function Reply(props: IMessageReplyProps) {
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