import User from "../../api/user.js";
import { makeid, render } from "../../utils/utils.js"

/**
 * @type {FunctionalComponent<IMessageProps, void>} 
 */
function message({ author, content, messageId }) {
  render('<div>', /*html*/`
    <div>
      <div class="message-author icon" style="--icon-url: url(${author.iconUrl})"></div>
    </div>
    <div class="message-content-warpper">
      <div class="author-name">${author.name}</div>
      <div class="content">
        <div>${content}</div>
      </div>
    </div>
  `, {
    class: 'message',
    'data-user-id': author.id,
    'data-message-id': messageId,
  }).to('.chat-content')

  console.log('message component created');
}

function followUpTheAboveMsg(content) {
  render('<div>', content).to('.message .content')
}

export default class Message {
  static message = message
  static followUpTheAboveMsg = followUpTheAboveMsg
}