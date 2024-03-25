// import { lazy } from "solid-js"
import { MessageType } from "../../api"
import { UserMessage } from "./user"

export type * from "./user"

export const MessageComponentMapping = {
  [MessageType.user]: UserMessage
}