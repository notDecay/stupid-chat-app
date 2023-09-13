import { Component } from "solid-js"

import ReplyIcon from "@components/icon/ReplyIcon"
import { Center } from "@hope-ui/solid"
import { Dynamic } from "solid-js/web"
import { MessageOptionButton } from "./MessageOptions"

export enum MessageOption {
  // interact other messages (include your message)
  CanReplyMessages,
  // interact YOUR message
  CanEditYourMessage,
  CanDeleteYourMessage
}

export const MAPPED_MESSAGE_OPTIONS = {
  [MessageOption.CanReplyMessages]: () => <MessageOptionButton icon={() => <ReplyIcon />} />,
  [MessageOption.CanDeleteYourMessage]: () => <></>,
  [MessageOption.CanEditYourMessage]: () => <></>
}

export const DEFAULT_OPTIONS = [
  MessageOption.CanReplyMessages,
  MessageOption.CanEditYourMessage,
  MessageOption.CanDeleteYourMessage,
]