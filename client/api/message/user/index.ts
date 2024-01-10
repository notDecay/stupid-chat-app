import type { IUser } from "../../user"
import { MessageType } from "../message"

export interface IUserMessageReference {
  id: string
}

export interface IUserMessage {
  id: string
  user: IUser
  content: string
  sentDate: Date
  editedDate?: Date
  replyTo?: IUserMessageReference
  type: MessageType.user
}

export interface ICachedUserMessage extends IUserMessage {
  renderedMessage: string
  isFollowUp: boolean
}