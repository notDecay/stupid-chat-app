import { IApiUser } from "./user"

export const enum MessageType {
  user
}

export interface IMessageReference {
  id: string
}

export interface IApiUserMessage {
  user: Pick<IApiUser, "id">
  content: string
  id: string
  sentTime: Date
  editedTime?: Date
  replyTo?: IMessageReference
}

export interface ICachedUserMessage extends IApiUserMessage {
  user: IApiUser
  type: MessageType.user
  replyTo?: Omit<this, "replyTo">
  isFollowUp: boolean
}

export type AnyApiMessage = IApiUserMessage
export type AnyCachedMessage = ICachedUserMessage