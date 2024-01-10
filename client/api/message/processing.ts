import { marked } from "../../lib/marked"
import { MessageStore } from "./cache"
import { ICachedUserMessage, IUserMessage } from "./user"

interface IProcessedChatMessage {
  isFollowUp: boolean
  renderMessage: string
}

export function processUserMessage(
  channelId: string, 
  message: IUserMessage,
  renderMessage: string
): IProcessedChatMessage {
  const lastMessage = MessageStore.lastMessageCache.get(channelId)
  const isFollowUp = message.user.id == lastMessage?.user.id

  const messageData = {
    ...message,
    renderedMessage: renderMessage,
    isFollowUp
  } satisfies ICachedUserMessage

  MessageStore.set(channelId, messageData)

  MessageStore.lastMessageCache.set(channelId, messageData)

  return {
    renderMessage,
    isFollowUp
  }
}

interface ICreatedChatMessageData {
  renderMessage: string
}

export async function createUserMessage(
  messageContent: string,
): Promise<ICreatedChatMessageData> {
  
  const renderMessage = await marked(messageContent, {
    async: true
  })

  return {
    renderMessage: renderMessage
  }
}