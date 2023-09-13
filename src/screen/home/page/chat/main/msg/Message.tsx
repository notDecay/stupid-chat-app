import type { Component } from "solid-js"

import { Avatar, Flex } from "@hope-ui/solid"
import MessageOptions from "./options/MessageOptions"
import type { IMessage } from "./ChatMessages"

export interface IMessageProps extends IMessage {
  isFollowUp: boolean
}

export const Message: Component<IMessageProps> = (props) => {
  return (
    !props.isFollowUp || props.replyTo ? <RegularMessage {...props} /> : <MessageFollowUp {...props} />
  )
}

const RegularMessage: Component<IMessageProps> = ({ user, content, date, id, replyTo }) => {
  const formatedDate = new Intl.DateTimeFormat('en').format(date)
  return (
    <div class="message user">
      <div></div>
      <Flex gap='var(--gap-between-avatar-and-content)'>
        <div>
          <Avatar src="something" class="user-avatar"></Avatar>
        </div>
        <div class="message-content">
          <Flex class="username" alignItems='center' gap={17}>
            <b>{user.name}</b>
            <span class="time">{formatedDate}</span>
          </Flex>
          <div>{content}</div>
        </div>
        <MessageOptions />
      </Flex>
    </div>
  )
}

// const MessageReply: Component<IMessageProps> = ({ replyTo }) => {
//   // 
// }

const MessageFollowUp: Component<IMessageProps> = ({ content }) => {
  return (
    <div class="message user follow-up">
      <div class="message-content">
        <div>{content}</div>
      </div>
      <MessageOptions />
    </div>
  )
}