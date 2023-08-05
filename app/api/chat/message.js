import Message from "../../components/page/chat/message.js"
import logdown from "../../utils/logdown.js"
import { convertNewLinesToBreakSpaces } from "../../utils/utils.js"
/**@type {Map<string, IMessageProps>} */
const messageCache = new Map()

/**
 * @param {IMessageProps} message
 */
export function createNewMessage(message) {
  console.log('calling Message.message()...')

  processMessage(message)

  const lastMessage = Array.from(messageCache.values()).pop()
  console.log('last message in cache:', lastMessage, ', message data', message)
  
  if (lastMessage?.author.id == message.author.id && !message.replyTo) {
    Message.followUp(message)
  }
  else Message.message(message)
  messageCache.set(message.messageId, message)
}

function processMessage(message) {
  const isHasLink = /(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-])/gm
  message.content = convertNewLinesToBreakSpaces(message.content)
  if (isHasLink.test(message.content)) {
    message.content = message.content.replace(isHasLink, (link) => {
      return Message.anchorLink({ link })
    })
  }
}

/**
 * @param {string} messageId
 * @returns {IMessageProps}
 */
export function getMessageFromId(messageId) {
  const message = messageCache.get(messageId)
  if (!message) logdown.warn(`message "${messageId}" does not exist`)
  return message
}