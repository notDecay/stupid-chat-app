import { MessageType, type ChatMessage } from "../../../api/message"
import UserMessage from "../message-user"

export default function __Message(message: ChatMessage) {
  switch (message.type) {
    case MessageType.UserMessage:
      return <UserMessage {...message} />
  }
}