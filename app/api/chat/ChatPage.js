import Component from "../../components/internal/Component.js"
import chatPage, { replyToUser } from "../../components/page/chatPage.js"
import logdown from "../../utils/logdown.js"
import { makeid } from "../../utils/utils.js"
import { createNewMessage } from "./messageUtils.js"
import ChatTextInput from "./ChatTextInput.js"

/**
 * @typedef {{
 *   'reply_user:show': [messageToReply: IMessageProps]
 *   'reply_user:hide': []
 * }} ChatPageEvents
 */

/**
 * @extends {Component<ChatPageEvents>}
 */
class _ChatPage extends Component {
  constructor() {
    super()
    if (window.__app__.mode !== "test") {
      socket.on('message', (msg) => {
        createNewMessage(msg)
      })
    }
  }

  #isReplyUserShowing = false
  create() {
    chatPage().create()
    const $textInput = /**@type {u<HTMLTextAreaElement>} */(u('.chat-message-input')),
      chatTextInput = new ChatTextInput($textInput)
    const $chatContent = u('.chat-content')

    chatTextInput.on('sending_message', (messageContent) => {
      this.sendMessage({ messageContent, replyMessage: this.#repliedMessage })
      $chatContent.nodes[0].scrollTop = $chatContent.nodes[0].scrollHeight + messageContent.length
      if (this.#isReplyUserShowing) {
        this.emit('reply_user:hide')
      }
    })

    chatTextInput.create()
    
    $textInput.on('keyup', (keyboardEv) => {
      if (keyboardEv.key === 'Escape' && this.#isReplyUserShowing) {
        this.emit('reply_user:hide')
      }
    })

    this.on('reply_user:show', (messageToReply) => {
      console.log('called')
      this.showReplyingTo(messageToReply)
      $chatContent.addClass('reply-user-shown')
    })

    this.on('reply_user:hide', () => {
      this.hideReplyingTo()
      $chatContent.removeClass('reply-user-shown')
    })
  }

  #repliedMessage = null
  #lastMessageId = ''
  /**@param {IMessageProps} messageToReply */
  showReplyingTo(messageToReply) {
    if (this.#lastMessageId == messageToReply.messageId) {
      return logdown.warn('message', messageToReply, 'already shown')
    }
    const $replyUserWarpper = u(`.chat-page .reply-user-warpper`)
    $replyUserWarpper.children('div').remove()
    $replyUserWarpper.addClass('show')
    replyToUser(messageToReply).create()
    this.#repliedMessage = messageToReply
    this.#lastMessageId = messageToReply.messageId
    this.#isReplyUserShowing = true
  }

  hideReplyingTo() {
    u('.reply-user-warpper > *').remove()
    const $replyUserWarpper = u(`.chat-page .reply-user-warpper`)
    $replyUserWarpper.children('div').remove()
    $replyUserWarpper.removeClass('show')
    this.#repliedMessage = null
    this.#lastMessageId = ''
    this.#isReplyUserShowing = false
  }

  /**
   * @param {{
   *   messageContent: string,
   *   replyMessage?: IMessageProps
   * }} requiredProps
   */
  sendMessage({ messageContent, replyMessage }) {
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
    
    if (window.__app__.mode === "test") {
      createNewMessage(message)
    }
    else {
      socket.emit('message', message)
    }
  }
}

const ChatPage = new _ChatPage()
export default ChatPage