import { 
  type IApiUserMessage, 
  MessageType, 
  type IMessageInputData, 
  type AnyApiMessage, 
  type AnyCachedMessage, 
  type ICachedUserMessage 
} from "~/features/chat"
import { store } from "../storage"

/**Interface defining the message creation options based on message type. */
interface ICreateMessageMapping {
  [MessageType.user]: IMessageInputData
}

const [user] = store.user
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
        id: user.id
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

export function apiMessageToCachedMessage<
  T extends AnyApiMessage,
  CachedMessage extends AnyCachedMessage
>(anyMessage: T, currentChannel: string): CachedMessage {
  const lastMessage = store.message.getLastItem(currentChannel)
  
  const repliedMessage = store.message.get(currentChannel)?.get(anyMessage.replyTo?.id ?? '')
  delete repliedMessage?.replyTo

  const newMessage = {
    ...anyMessage,
    type: MessageType.user,
    isFollowUp: false,
    user,
    replyTo: repliedMessage
  } as ICachedUserMessage
  
  newMessage.isFollowUp = newMessage.user.id === lastMessage?.user.id
  if (newMessage.replyTo) {
    newMessage.isFollowUp = false
  }

  return newMessage
}