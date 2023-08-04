import Message from "../../components/chat/message.js"
import { makeid } from "../../utils/utils.js";
import User from "../user.js";
/**@type {Map<string, IMessageProps>} */
const messageCache = new Map()

/**
 * @param {string} msgContent 
 */
export function createNewMessage(msgContent) {
  console.log('calling Message.message()...');
  /**@type {IMessageProps} */
  const messageToSend = {
    author: {
      iconUrl: '',
      name: 'Some author',
      id: `user-${User.generateUserId()}`
    },
    content: msgContent,
    messageId: makeid(20)
  }

  if (Array.from(messageCache.values()).pop()?.author.id == messageToSend.author.id) {
    Message.followUpTheAboveMsg(msgContent)
  }
  else Message.message(messageToSend)
  messageCache.set('message', messageToSend)
}