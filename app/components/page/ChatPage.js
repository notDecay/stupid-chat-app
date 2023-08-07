import { render } from "../../utils/utils.js"
/**@type {FunctionalComponent<null, ComponentCreatable>} */
export default function() {
  const page = /*html*/`
    <div class="chat-page">
      <link rel="stylesheet" href="./res/style/chat-page.css">
      <!-- <div class="chat-title-warpper"></div> -->
      <div class="chat-content"></div>
      <div class="chat-msg-input-container">
        <div class="reply-user-warpper"></div>
        <div class="message-input">
          <div class="upload">
            <div class="icon icon-plus"></div>
          </div>
          <textarea class="chat-message-input no-bg no-outline" rows="1" placeholder="Say something :)"></textarea>
        </div>
      </div>
    </div>
  `

  return {
    create() {
      render(page).to('.app-main')
    }
  }
}

/**@type {FunctionalComponent<IMessageProps, ComponentCreatable>} */
export function replyToUser({ author, content }) {
  const replyPreview = /*html*/`
    <div class="empty">
      <div class="reply-to-author">Replying to <span class="reply-author">${author.name}</span></div>
      <div class="reply-msg-content">${content}</div>
    </div>
  `

  return {
    create() {
      render(replyPreview).to('.reply-user-warpper')
    }
  }
}