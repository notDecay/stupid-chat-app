import logdown from "../../../utils/logdown.js"
import EventEmitter from "../../../utils/EventEmitter.js"
import MarkdownParser from "./MarkdownParser.js"
import Message from "./Message.svelte"
/**@type {Map<string, IMessageCache>} */
const messageCache = new Map()
const markdownParser = new MarkdownParser()
/**
 * @param {IMessageProps} message
 */
export function createNewMessage(message) {
  console.time('making toast')
  let renderedMessage = processMessage(sanitizeMessage(message.content))
  const lastMessage = Array.from(messageCache.values()).pop()
  const mountingPoint = u('.chat-content').nodes[0]

  const isUserSentTheSameMessage = lastMessage?.author.id == message.author.id && !message.replyTo
  console.log(isUserSentTheSameMessage);
  new Message({
    target: mountingPoint,
    props: { 
      message: { ...message, content: renderedMessage },
      isFollowUpMessage: !isUserSentTheSameMessage
    }
  })

  messageCache.set(message.messageId, {
    ...message,
    renderedMessage
  })
  console.timeEnd('making toast')
}

function sanitizeMessage(messageContent = '') {
  return messageContent.replaceAll('&', '<span>&amp;</span>')
  .replace(/<|>/gm, (it) => {
    if (!it) return ''
    const theThing = it
      .replaceAll('>', '&gt;')
      .replaceAll('<', '&lt;')
    return `<span>${theThing}</span>`
  })
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
 * @returns {IMessageCache}
 */
export function getMessageFromId(messageId) {
  const message = messageCache.get(messageId)
  if (!message) logdown.warn(`message "${messageId}" does not exist`)
  return message
}

/**
 * @typedef {{
 *   'show_replying_to': [repliedMessage: IMessageCache],
 *   'hide_replying_to': [],
 *   'send_message': [messageContent: string, repliedMessage?: IMessageProps]
 * }} ChatPageEvents
 * @type {EventEmitter<ChatPageEvents>}
 */
export const chatPageEvent = new EventEmitter() 