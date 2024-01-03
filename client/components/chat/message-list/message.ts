import logdown from "../../../utils/logdown"
import { MessageCache } from "./cache"

const fetchMessage = fetch

export type ChatMessage = IUserMessage

interface IMessageFetchOptions {
  channelId: string
  messageId: string
}

export interface IMessageReference {
  id: string
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
}

export namespace Message {
  /**Fetch the message by its id.
   * 
   * It first fetch the message from cache first. If it not found,
   * it attempts to fetch from the database.
   * @param channelId the channel id
   * @param messageId the message id
   * @returns the message from that channel or `null` if it does not found
   * the message
   */
  export async function fetch({ 
    channelId, 
    messageId 
  }: IMessageFetchOptions) {
    logdown.start(`fetching message ${messageId} in channel ${channelId} from cache...`)
    const cache = MessageCache.getMessageCacheStore(channelId)
    const messageInCache = cache?.get(messageId)
    if (messageInCache) {
      logdown.success("|  okey :)")
      return messageInCache
    }

    logdown.info("|  does not exist, fetching from database...")

    try {
      let message = await fetchMessage(`/api/channel/${channelId}/${messageId}`, {
        method: "GET"
      })

      message = await message.json()
      logdown.success("|  okey :)")
      return message as unknown as ChatMessage
    } catch (e) {
      logdown.err(e)
      return null
    }
  }
}