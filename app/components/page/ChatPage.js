import logdown from "../../utils/logdown.js"
import { render, makeid } from "../../utils/utils.js"
import { createNewMessage } from "../../api/chat/message.js"
import Component from "../internal/Component.js"

/**
 * @typedef {{
 *   'reply_user:show': [messageToReply: IMessageProps]
 *   'reply_user:hide': []
 * }} ChatPageEvents
 */

/**
 * @extends {Component<Events<ChatPageEvents>>}
 */
class _ChatPage extends Component {
  constructor() {
    super()
    if (window.__app__.mode !== "test") {
      socket.on('message', (msg) => {
        // createNewMessage(convertNewLinesToBreakSpaces(msg))
        createNewMessage(msg)
      })
    }
  }

  render() {
    render(/*html*/`
      <div class="chat-page">
        <link rel="stylesheet" href="./res/style/chat-page.css">
        <!-- <div class="chat-title-warpper"></div> -->
        <div class="chat-content">
          
        </div>
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
    `).to('.app-main')
  }

  #isReplyUserShowing = false
  /**@param {IMessageProps} messageToReply */
  renderReplyMessage({ author, content }) {
    render(/*html*/`
      <div>
        <div class="reply-to-author">Replying to <span class="reply-author">${author.name}</span></div>
        <div class="reply-msg-content">${content}</div>
      </div>
    `).to(`.chat-page .reply-user-warpper`)

    this.#isReplyUserShowing = true
  }

  create() {
    this.render()
    const $textInput = u('.chat-message-input')
    const $chatContent = u('.chat-content')

    $textInput.on('keypress', (keyboardEvent) => {
      if (keyboardEvent.shiftKey && keyboardEvent.key == 'Enter') return console.log('user make a new lines')
      if (keyboardEvent.key !== 'Enter') return 
      keyboardEvent.preventDefault()
      const messageContent = /**@type {string}*/($textInput.text()).trim()
      if (messageContent == '') return logdown.warn('message is empty')
      $textInput.text('')
      
      const message = {
        author: {
          iconUrl: '',
          name: 'Anonymous',
          id: /**@type {UserId}*/(sessionStorage.getItem('user_id'))
        },
        content: messageContent,
        messageId: makeid(20)
      }

      if (this.#isReplyUserShowing) {
        message.replyTo = replyMessage
      }
      
      this.sendMessage(message)

      $chatContent.nodes[0].scrollTop = $chatContent.nodes[0].scrollHeight + messageContent.length
      $textInput.focus()
      this.emit('reply_user:hide')
      console.log('done')
    })

    $textInput.on('keyup', (keyboardEvent) => {
      if (keyboardEvent.key === 'Escape' && this.#isReplyUserShowing) {
        this.emit('reply_user:hide')
      }
    })

    let lastMessageId = '', replyMessage = null
    this.on('reply_user:show', (messageToReply) => {
      if (lastMessageId == messageToReply.messageId) return logdown.warn('message', messageToReply, 'already shown')
      replyMessage = messageToReply
      const $replyUserWarpper = u(`.chat-page .reply-user-warpper`)
      $replyUserWarpper.children('div').remove()
      $replyUserWarpper.addClass('show')

      this.renderReplyMessage(messageToReply)
      lastMessageId = messageToReply.messageId
    })

    this.on('reply_user:hide', () => {
      replyMessage = null
      const $replyUserWarpper = u(`.chat-page .reply-user-warpper`)
      $replyUserWarpper.children('div').remove()
      $replyUserWarpper.removeClass('show')
      this.#isReplyUserShowing = false
    })
  }

  /**@param {IMessageProps} message */
  sendMessage(message) {
    if (window.__app__.mode === "test") {
      createNewMessage(message)
    }
    else {
      socket.emit('message', message)
    }
    console.log('message created')
  }
}


const ChatPage = new _ChatPage()
export default ChatPage