import { MessageWrapper } from "../MessageWrapper"
import { Show } from "solid-js"
// ...
import { MessageEditingOption, MessageOptionList } from "./option"
import { FollowUpMessage, NormalMessage } from "./variant"
import type { ICachedUserMessage } from "~/features/chat"

export interface IUserMessageProps extends ICachedUserMessage {
  isFollowUp: boolean
  previewMode?: boolean
}

export default function UserMessage(props: IUserMessageProps) {
  return (
    <MessageWrapper type="user" messageId={props.id} isFollowUp={props.isFollowUp}>
      <Show when={props.isFollowUp} fallback={
        <NormalMessage {...props} />
      }>
        <FollowUpMessage {...props} />
      </Show>
      <Show when={!props.previewMode}>
        <MessageOptionList options={[
          MessageEditingOption.edit,
          MessageEditingOption.delete,
          MessageEditingOption.reply,
        ]} />
      </Show>
    </MessageWrapper>
  )
}