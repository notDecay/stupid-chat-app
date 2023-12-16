import { Show } from "solid-js"
import { Avatar, Flex } from "@hope-ui/solid"
import { Message } from "../../utils"

import MessageUsername from "./MessageUsername"
import MessageContent from "./MessageContent"
import MessageOptions from "./MessageOptions"
import MessageReply from "./MessageReply"

import style from "./UserMessage.module.scss"
import MessageWrapUp from "./MessageWrapUp"
import { ChatMessageEvents, useChatMessages } from "../provider/ChatMessagesProvider"

export interface IUserMessageProps extends Omit<Message.IUserMessage, "replyTo"> {
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

  return (
    <MessageWrapUp id={props.id}>
      <Show when={props.replyTo}>
        {/* @ts-ignore */}
        <MessageReply repliedTo={props.replyTo!} />
      </Show>
      <Flex alignItems="center" gap={15} class={style["user-message"]}>
        <Show when={shouldFollowUp} fallback={<NormalMessage {...props} />}>
          <FollowUpMessage {...props} />
        </Show>
        <MessageOptions onOptionClicked={(action) => {
          switch (action) {
            case "reply":
              event.emit(ChatMessageEvents.replyButtonSelected, props.id)
              break
            case "delete":
              event.emit(ChatMessageEvents.deleteButtonSelected, props.id)
              break
            default:
              console.log(action, "hasn't been defined yet :(")
              break
          }
        }} />
      </Flex>
    </MessageWrapUp>
  )
}

function NormalMessage(props: IUserMessageProps) {
  return (
    <>
      <Avatar class={style.avatar} />
      <div>
        <MessageUsername {...props} />
        <MessageContent {...props} />
      </div>
    </>
  )
}

function FollowUpMessage(props: IUserMessageProps) {
  return (
    <div class={style["follow-up-message"]}>
      <MessageContent {...props} />
    </div>
  )
}