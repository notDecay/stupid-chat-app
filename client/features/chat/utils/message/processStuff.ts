import { 
  MessageType, 
  type AnyApiMessage, 
  type AnyCachedMessage,
  type ICachedUserMessage, 
} from "../../api"
import { messageStore } from "../../storage"

export function apiMessageToCachedMessage<
  ApiMessage extends AnyApiMessage,
  CachedMessage extends AnyCachedMessage
>(anyMessage: ApiMessage, currentChannel: string): CachedMessage {
  const lastMessage = messageStore.getLastItem(currentChannel)

  console.log('last message is:', lastMessage)

  const newMessage = {
    ...anyMessage,
    type: MessageType.user,
    isFollowUp: false,
    user: {
      id: '',
      name: ''
    } // get this somewhere
  } as ICachedUserMessage
  
  newMessage.isFollowUp = newMessage.user.id === lastMessage?.user.id

  return newMessage
}