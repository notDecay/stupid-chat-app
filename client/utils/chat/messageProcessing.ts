import { 
  type ChatMessage,
  MessageCache, // use for documentation only
  Message, 
  escapeHtml, 
  makeUUIDv4, 
  marked 
} from ".."

export type ProcessMessageOptions = {
  /**The message content to be processed */
  messageContent: string
  /**The last message in cache, can use this function to get the last message
   * ```
   * MessageCache.getLastMessage("store-name-aka-channel-id")
   * ```
   * @see {@link MessageCache}
   */
  lastMessageInCache: ChatMessage | undefined
}

export type ProcessedMessageData = {
  /**The processed message data, this will be used to display the message in the chat */
  messageToSendData: Message.IUserMessage
  /**Whenever this message is a follow up message or not */
  isFollowUpMessage: boolean
  /**This message id */
  messageId: string
}

/**Do some message processing stuff.
 * @param options options to process message, see {@link ProcessMessageOptions}
 *                for the usage of each options.
 * @returns       the processed message, see {@link ProcessedMessageData} to see
 *                what it will return.
 */
export async function processMessage({
  lastMessageInCache,
  messageContent
}: ProcessMessageOptions): Promise<ProcessedMessageData> {
  const markdownMessage = await marked.parse(escapeHtml(messageContent), {
    async: true
  })

  const messageId = `message-${makeUUIDv4()}`
  const messageToSendData: Message.IUserMessage = {
    content: markdownMessage,
    id: messageId,
    sendTime: new Date(),
    user: {
      id: "10000000000",
      name: "test"
    }
  }

  let isFollowUpMessage: boolean
  if (lastMessageInCache) {
    isFollowUpMessage = lastMessageInCache.user.id === messageToSendData.user.id
  }
  else {  
    isFollowUpMessage = false
  }

  return {
    messageToSendData,
    isFollowUpMessage,
    messageId
  }
}