import { Show } from "solid-js"
import { mergeClassNames } from "@client/utils"
import { ChatMessageEvents, useChatMessages } from "@provider"
import type { IUserMessage } from "@client/api/message"
import MessageWrapUp from "../message/MessageWrapUp"
import { MessageActions } from "../message/actions"
import { Avatar, Flex } from "@hope-ui/solid"
import { MESSAGE_FOLLOW_UP_KEY } from "../message"

import MessageReply from "./MessageReply"
import MessageContent from "./MessageContent"
import MessageOptions from "./MessageOptions"

import "./UserMessage.scss"

export interface IUserMessageProps extends Omit<IUserMessage, "replyTo"> {
  isFollowUp?: boolean
  // override
  replyTo?: this
}

export default function UserMessage(props: IUserMessageProps) {
  const { event } = useChatMessages()
  
  let shouldFollowUp = props.isFollowUp
  if (props.replyTo) {
    shouldFollowUp = false
  }

  const optionClickedHandler = (action: MessageActions) => {
    event.emit(ChatMessageEvents.messageOptionClicked, action, props.id)
  }

  return (
    <MessageWrapUp 
      id={props.id} 
      class={mergeClassNames(
        "user-message", 
        shouldFollowUp ? MESSAGE_FOLLOW_UP_KEY : '',
        props.replyTo ? 'reply' : ''
      )}
    >
      <Show when={props.replyTo}>
        <MessageReply repliedTo={props.replyTo!} />
      </Show>
      <Flex alignItems="center" gap={15}>
        <Avatar class="avatar" />
        <MessageContent {...props} />
        <MessageOptions onOptionClicked={optionClickedHandler} actions={[
          MessageActions.Reply,
          MessageActions.Delete,
        ]} />
      </Flex>
    </MessageWrapUp>
  )
}