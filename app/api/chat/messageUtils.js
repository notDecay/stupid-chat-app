import logdown from "../../utils/logdown.js"
import MessageFactory from "../../components/page/message/message.js"
import MarkdownParser from "./MarkdownParser.js"
/**@type {Map<string, IMessageProps>} */
const messageCache = new Map()
const markdownParser = new MarkdownParser()
/**
 * @param {IMessageProps} message
 */
export function createNewMessage(message) {
  message.content = processMessage(message)

  const lastMessage = Array.from(messageCache.values()).pop()
  console.log('last message in cache:', lastMessage, ', message data', message)
  
  if (lastMessage?.author.id == message.author.id && !message.replyTo) {
    MessageFactory.followUpMessage(message).create()
  }
  else {
    MessageFactory.message(message).create()
  }
  messageCache.set(message.messageId, message)
}

/**
 * @param {IMessageProps} message
 */
function processMessage(message) {
  let msgContent = message.content
  const isHasLink = /(http|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-])/gm
  msgContent = msgContent.replace(isHasLink, (link) => /*html*/`
    <a href="${link}" target="_blank">${link}</a>
  `)
  return markdownParser.parse(msgContent)
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