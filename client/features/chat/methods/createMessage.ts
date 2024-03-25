import { type IApiUserMessage, MessageType, IMessageInputData } from "~/features/chat"

/**Interface defining the message creation options based on message type. */
interface ICreateMessageMapping {
  [MessageType.user]: IMessageInputData
}

/**Asynchronously creates a message.
 * 
 * It tries to create a POST request from the server, the server will create a message
 * based on provied options.
 * 
 * If the given `messageType` didn't support by the app, it throw a `Error`.
 *
 * @param messageType The type of message to create.
 * @param options Options specific to the message type.
 * @returns The constructed message object.
 * @throws `Error` if the message type is not supported.
 * 
 * @see {@link ICreateMessageMapping} for its options
 */
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