import { ChatSocketEvent } from "./apiRoutes"
import type { IUserMessage } from "../client/api/message/user"
import type { IUser } from "../client/api/user"

type ChatMessageSendListener = (option: { 
  type: IUserMessage["type"], 
  message: IUserMessage,
}) => any

type ChatMessageReceiverListener = (option: {
  type: IUserMessage["type"], 
  messageData: {
    content: string,
  }
  user: IUser
}) => any

/**A list of socket event in the chat */
export namespace ChatSocketEventMap {
  export type ServerToClient = {
    [ChatSocketEvent.messageSend]: 
      ChatMessageSendListener
  }
  
  export type ClientToServer = {
    [ChatSocketEvent.messageSend]: 
      ChatMessageReceiverListener
  }
}
