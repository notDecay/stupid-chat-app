import { render } from "../../../utils/utils.js"
import editMessageArea from "./editMessage.js"

/**@type {FunctionalComponent<IMessageProps, ComponentCreatable>} */
function message({ replyTo, messageId, author, content }) {
  const renderReplyMessageOrNot = replyTo ? /*html*/`
    <div class="message-reply">
      <div class="author icon"></div>
      <div class="author-name">${replyTo.author.name}</div>
      <div class="content">${replyTo.content}</div>
    </div>
  ` : ''

  const messageContent = /*html*/`
    <div class="message-content-container">
      <div>
        <!-- <div class="message-author icon" style="--icon-url: url(${author.iconUrl})"></div> -->
        <div class="author icon"></div>
      </div>
      <div class="message-content-warpper">
        <div class="author-name">${author.name}</div>
        <div class="content">
          <p>${content}</p>
        </div>
      </div>
    </div>
  `

  render(/*html*/`
    <div class="message last-message" message-id="${messageId}" user-id="${author.id}">
      ${renderReplyMessageOrNot}
      ${messageContent}
    </div>
  `).to('.chat-content')

  return {
    create() {
      editMessageArea({ messageId }).create()
    }
  }
}

/**@type {FunctionalComponent<IMessageProps, ComponentCreatable>} */
function followUpMessage({ messageId, author, content }) {
  u('.message:last-child').removeClass('last-message')
  render(/*html*/`
    <div class="message follow-up last-message" message-id="${messageId}" user-id="${author.id}">
      <div class="content">
        <p>${content}</p>
      </div>
    </div>
  `).to('.chat-content')

  return {
    create() {
      editMessageArea({ messageId }).create()
    }
  }
}

const MessageFactory = {
  message,
  followUpMessage
}

export default MessageFactory