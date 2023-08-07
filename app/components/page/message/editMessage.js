import { getMessageFromId } from "../../../api/chat/messageUtils.js"
import ChatPage from "../../../api/chat/ChatPage.js"
import { render } from "../../../utils/utils.js"

/**@type {FunctionalComponent<{ messageId }, ComponentCreatable>} */
export default function editMessageArea({ messageId }) {
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
        console.log(ChatPage.emit('reply_user:show', getMessageFromId(messageId)));
      })
    }
  }
}

/**
 * @typedef {{
 *   iconName: string
 * }} EditButtonProps
 * @type {FunctionalComponent<EditButtonProps, string>}
 */
function editButtonBuilder ({ iconName }) {
  return /*html*/`
    <div class="this-is edit-button bro" aria-label="button">
      <div class="icon ${iconName}"></div>
    </div>
  `
}