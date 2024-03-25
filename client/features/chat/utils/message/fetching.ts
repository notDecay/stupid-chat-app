import { IApiUserMessage, MessageType } from "../../api"
import { IMessageInputData } from "../../components"

export async function createMessage(data: IMessageInputData, messageType: MessageType) {
  if (messageType === MessageType.user) {
    const messageThatShouldFetchFromServer = {
      content: data.rawMessageContent,
      id: crypto.randomUUID(),
      sentTime: new Date(),
      user: {
        id: '10000'
      },
    } as IApiUserMessage

    if (data.repliedMessage) {
      messageThatShouldFetchFromServer.replyTo = {
        id: data.repliedMessage.id
      }
    }

    return messageThatShouldFetchFromServer 
  }

  throw new Error('Failed to create message')
}