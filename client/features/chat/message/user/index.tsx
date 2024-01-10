import { Avatar } from "@hope-ui/solid"
import { MessageWrapper } from "../MessageWrapper"
import { token } from "./token.stylex"
import { Show } from "solid-js"
import stylex from "@stylexjs/stylex"
import { MessageAction } from "./MessageOptionMapping"
import type { IUserMessage } from "../../../../api/message/user"

import MessageHeader from "./MessageHeader"
import MessageContent from "./MessageContent"
import MessageOption from "./MessageOption"

const style = stylex.create({
  avatar: {
    width: token.avatarSize,
    height: token.avatarSize
  },
  messageContent: {
    height: '100%'
  },
  followUpMessage: {
    paddingLeft: `calc(${token.avatarSize} + 15px)`
  }
})

export interface IUserMessageProps extends IUserMessage {
  isFollowUp: boolean
}

export function UserMessage(props: IUserMessageProps) {
  if (props.replyTo) {
    props.isFollowUp = true
  }

  return (
    <MessageWrapper type="user" messageId="something" isFollowUp={props.isFollowUp}>
      <Show when={props.isFollowUp} fallback={<>
        <Avatar {...stylex.props(style.avatar)} />
        <div {...stylex.props(style.messageContent)}>
          <MessageHeader {...props} />
          <MessageContent {...props} />
        </div>
      </>}>
        <div {...stylex.props(style.followUpMessage)}>
          <MessageContent {...props} />
        </div>
      </Show>
      <MessageOption actions={[
        MessageAction.edit,
        MessageAction.delete,
        MessageAction.reply,
      ]} messageId={props.id} />
    </MessageWrapper>
  )
}