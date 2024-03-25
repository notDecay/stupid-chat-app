// import type { 
//   ICachedUserMessage, 
//   IUser, 
//   IUserMessage, 
//   MessageType 
// } from "../../client/features/chat"

// export const enum ChatSocketEventName {
//   sendMessage = "0"
// }

// export namespace ChatSocketEvent {
//   export type ClientToServer = {
//     [ChatSocketEventName.sendMessage]: (options: {
//       type: MessageType
//       user: IUser
//       data: {
//         content: string
//         rawMessageContent: string
//         repliedMessage: IUserMessage | ICachedUserMessage
//       }
//     }) => any
//   }

//   export type ServerToClient = {
//     [ChatSocketEventName.sendMessage]: (options: {
//       type: MessageType
//       data: IUserMessage
//     }) => any
//   }
// }

export {}