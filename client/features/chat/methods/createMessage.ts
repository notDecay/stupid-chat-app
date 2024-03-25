import { IApiUserMessage, MessageType, IMessageInputData } from "~/features/chat"

interface ICreateMessageMapping {
  [MessageType.user]: IMessageInputData
}

export async function createMessage<T extends MessageType>(
  messageType: T, 
  options: ICreateMessageMapping[T]
) {
  if (messageType === MessageType.user) {
    const { rawMessageContent, repliedMessage } = options
    const messageThatShouldFetchFromServer = {
      content: rawMessageContent,
      id: crypto.randomUUID(),
      sentTime: new Date(),
      user: {
        id: '10000'
      },
    } as IApiUserMessage

    if (repliedMessage) {
      messageThatShouldFetchFromServer.replyTo = {
        id: repliedMessage.id
      }
    }

    return messageThatShouldFetchFromServer 
  }

  throw new Error('Failed to create message')
}