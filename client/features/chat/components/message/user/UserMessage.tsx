import { MessageWrapper } from "../MessageWrapper"
import { Show } from "solid-js"
import { createStore } from "solid-js/store"
// ...
import { MessageOptionList } from "./option"
import { 
  FollowUpMessage, 
  NormalMessage 
} from "./variant"
import { 
  MessageEditingOption, 
  type ICachedUserMessage 
} from "~/features/chat"

export interface IUserMessageProps extends ICachedUserMessage {
  isFollowUp: boolean
  previewMode?: boolean
}

export default function UserMessage(props: IUserMessageProps) {
  const [message, setMessage] = createStore(props)

  return (
    <MessageWrapper 
      messageId={message.id} 
      isFollowUp={message.isFollowUp}
    >
      <Show when={message.isFollowUp} fallback={
        <NormalMessage {...message} />
      }>
        <FollowUpMessage {...message} />
      </Show>
      <Show when={!message.previewMode}>
        <MessageOptionList options={[
          MessageEditingOption.edit,
          MessageEditingOption.delete,
          MessageEditingOption.reply,
        ]} />
      </Show>
    </MessageWrapper>
  )
}