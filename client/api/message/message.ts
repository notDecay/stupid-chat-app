import type { ICachedUserMessage, IUserMessage } from "./user"

export type ChatMessage = IUserMessage
export type CachedChatMessage = ICachedUserMessage

export const enum MessageType {
  user
}