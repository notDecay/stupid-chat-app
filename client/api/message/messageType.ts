export const enum MessageType {
  UserMessage
}

export interface IUserMessage {
  user: {
    avatarUrl?: string
    name: string
    id: string
  }
  content: string
  replyTo?: IMessageReference
  id: string
  sendTime: Date
  type: MessageType.UserMessage
}

export interface IMessageReference {
  id: string
}