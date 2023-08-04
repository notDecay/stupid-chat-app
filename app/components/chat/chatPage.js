import logdown from "../../utils/logdown.js"
import { render, convertNewLinesToBreakSpaces } from "../../utils/utils.js"
import { createNewMessage } from "../../api/chat/message.js"

/**
 * @type {FunctionalComponent<{}, ComponentCreatable>} 
 */
export default function() {
  render('<div>', /*html*/`
    <link rel="stylesheet" href="./res/style/chat-page.css">
    <!-- <div class="chat-title-warpper"></div> -->
    <div class="chat-content">
      <!--  -->
    </div>
    <div class="chat-msg-input-warpper">
      <div class="upload">
        <div class="icon icon-plus"></div>
      </div>
      <textarea class="chat-message-input no-bg no-outline" rows="1" placeholder="Say something :)"></textarea>
    </div>
  `, {
    class: 'chat-page'
  }).to('.app-main')
  return {
    create() {
      const $textInput = u('.chat-message-input')
      const $chatContent = u('.chat-content')

      $textInput.on('keypress', (keyboardEvent) => {
        if (keyboardEvent.shiftKey && keyboardEvent.key == 'Enter') return console.log('user make a new lines');
        if (keyboardEvent.key == 'Enter') {
          keyboardEvent.preventDefault()
          const messageContent = /**@type {string}*/($textInput.text()).trim()
          if (messageContent == '') return logdown.warn('message is empty')
          $textInput.text('')

          console.log('message created');
          if (window.__app__.mode === "test") {
            createNewMessage(convertNewLinesToBreakSpaces(messageContent))
          }
          else {
            socket.emit('message', messageContent)
            socket.on('message', (msg) => {
              createNewMessage(convertNewLinesToBreakSpaces(msg))
            })
          }

          $chatContent.nodes[0].scrollTop = $chatContent.nodes[0].scrollHeight
          console.log('done')
        }
      })
    },
  }
}