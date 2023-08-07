import Component from "../../components/internal/Component.js"
import logdown from "../../utils/logdown.js"
/**
 * @typedef {{
 *   'sending_message': [messageContent: string]
 * }} ChatTextInputEvents
 */

/**
 * @extends {Component<ChatTextInputEvents>}
 */
export default class extends Component {
  /**@param {u<HTMLTextAreaElement>} $textInput */
  constructor($textInput) {
    super()
    this.$textInput = $textInput
  }

  create() {
    this.$textInput.on('keypress', (keyboardEv) => {
      this.#onTyping(keyboardEv)
    })

    this.$textInput.on('input', () => this.#autoResizeTextInput())
  }

  MAXINUM_TEXT_INPUT_ROWS = 20
  #autoResizeTextInput() {
    const thisTextInput = this.$textInput.nodes[0]
    this.$textInput.on('input', () => {
      if (this.$textInput.scrollHeight >= this.MAXINUM_TEXT_INPUT_ROWS * 15) {
        return logdown.warn('maxinum rows exceeded')
      }
      thisTextInput.classList
      thisTextInput.style.height = '';
      thisTextInput.style.height = this.$textInput.scrollHeight + 'px';
    })
  }

  #resetTextInput() {
    this.$textInput.nodes[0].style.height = ''
  }

  /**@param {KeyboardEvent} keyboardEv */
  #onTyping(keyboardEv) {
    if (keyboardEv.shiftKey && keyboardEv.key === 'Enter') return
    if (keyboardEv.key !== 'Enter') return 
    keyboardEv.preventDefault()

    const messageInTextInput = this.$textInput.text()
    const messageContent = /**@type {string}*/(messageInTextInput).trim()
    if (
      messageContent == '' ||
      messageInTextInput == '> ' 
    ) return logdown.warn('message is empty')
    this.$textInput.text('')
    this.$textInput.focus()
    this.emit('sending_message', messageContent)
    
    this.#resetTextInput()
  }
}