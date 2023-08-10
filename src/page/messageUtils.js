import logdown from "../../src/utils/logdown.js"
import MarkdownParser from "./MarkdownParser.js"
import Message from "./Message.svelte"
import MessageFollowUp from "./MessageFollowUp.svelte"
/**@type {Map<string, IMessageProps>} */
const messageCache = new Map()
const markdownParser = new MarkdownParser()
/**
 * @param {IMessageProps} message
 */
export function createNewMessage(message) {
  let renderedMessage = sanitizeMessage(message.content)
  renderedMessage = processMessage(renderedMessage)

  console.log('render message content is:', renderedMessage);

  const lastMessage = Array.from(messageCache.values()).pop()
  const mountingPoint = u('.chat-content').nodes[0]
  console.log('last message in cache:', lastMessage, ', message data', message)
  
  if (lastMessage?.author.id == message.author.id && !message.replyTo) {
    new MessageFollowUp({
      target: mountingPoint,
      props: { message: { ...message, content: renderedMessage } }
    })
  }
  else {
    new Message({
      target: mountingPoint,
      props: { message: { ...message, content: renderedMessage } }
    })
  }

  messageCache.set(message.messageId, message)
}

function sanitizeMessage(messageContent = '') {
  return messageContent.replace(/<|>/gm, (it) => {
    if (!it) return ''
    const theThing = it
      .replaceAll('>', '&gt;')
      .replaceAll('<', '&lt;')
    return `<span>${theThing}</span>`
  }).replaceAll('&', '<span>&amp;</span>')
}

/**
 * @param {string} messageContent
 */
function processMessage(messageContent) {
  const isHasLink = /(http|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-])/gm
  messageContent = messageContent.replace(isHasLink, (link) => /*html*/`
    <a href="${link}" target="_blank">${link}</a>
  `)
  return newLinesToBreakSpaces(markdownParser.parse(messageContent))
}

function newLinesToBreakSpaces(messageContent = '') {
  return messageContent.replace(/\n/gm, it => `<div>${it}</div>`)
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