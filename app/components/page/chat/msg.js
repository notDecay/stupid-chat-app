import { getMessageFromId } from "../../../api/chat/message.js"
import { render } from "../../../utils/utils.js"
import ChatPage from "../ChatPage.js"

/**
 * @type {FunctionalComponent<IMessageProps, void>} 
 */
function message({ author, content, messageId, replyTo }) {
  const renderReplyMessageOrNot = replyTo ? /*html*/`
    <div class="message-reply">
      <div class="author icon"></div>
      <div class="author-name">${replyTo.author.name}</div>
      <div class="content">${replyTo.content}</div>
    </div>
  ` : ''

  render(/*html*/`
    <div class="message last-message" message-id="${messageId}" user-id="${author.id}">
      ${renderReplyMessageOrNot}
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
    </div>
  `).to('.chat-content')

  editMessageArea({ messageId }).create()
  console.log('message component created')
}

/**
 * @type {FunctionalComponent<IMessageProps, void>} 
 */
function followUp({ author, content, messageId }) {
  u('.message:last-child').removeClass('last-message')
  render(/*html*/`
    <div class="message follow-up last-message" message-id="${messageId}" user-id="${author.id}">
      <div class="content">
        <p>${content}</p>
      </div>
    </div>
  `).to('.chat-content')

  editMessageArea({ messageId }).create()
}

/**
 * @type {FunctionalComponent<{ messageId: string }, ComponentCreatable>} 
 */
function editMessageArea({ messageId }) {
  /**
   * @typedef {{
   *   iconName: string
   * }} EditButtonProps
   * @type {FunctionalComponent<EditButtonProps, string>}
   */
  const editButtonBuilder = ({ iconName }) => /*html*/`
    <div class="this-is edit-button bro" aria-label="button">
      <div class="icon ${iconName}"></div>
    </div>
  `

  const editIconOptions = ['icon-reply']
  const thisMessageSelector = `.message[message-id="${messageId}"]`
  render(/*html*/`
    <div class="edit-message-container">
      <div class="edit-message-icons">
        ${editIconOptions.map((icon) => editButtonBuilder({ iconName: icon })).join(' ')}
      </div>
    </div>
  `,).to(thisMessageSelector)

  return {
    create() {
      const $editButton = u(`${thisMessageSelector} .edit-button`)
      $editButton.on('click', () => {
        ChatPage.emit('reply_user:show', getMessageFromId(messageId))
      })
    }
  }
}

const Message = { message, followUp }

export default Message