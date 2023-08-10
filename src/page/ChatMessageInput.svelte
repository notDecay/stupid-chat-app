<script>
  import logdown from "../utils/logdown.js"
  import { createEventDispatcher } from "svelte"

  const dispatch = createEventDispatcher()

  const MAXINUM_TEXT_INPUT_ROWS = 20
  /**@param {Event} event */
  function autoResize (event) {
    const input = /**@type {HTMLTextAreaElement}*/(event.target)
    if (input.scrollHeight > MAXINUM_TEXT_INPUT_ROWS * 15) {
      return logdown.warn('maxinum rows exceeded')
    }

    resetInput(input)
    input.style.height = input.scrollHeight + 'px'
  }

  /**@param {HTMLTextAreaElement} input */
  function resetInput (input) {
    input.style.height = ''
  }

  /**@param {KeyboardEvent} keyboardEv */
  function onTyping (keyboardEv) {
    if (keyboardEv.shiftKey && keyboardEv.key === 'Enter') return
    if (keyboardEv.key !== 'Enter') return 
    keyboardEv.preventDefault()
    const input = /**@type {HTMLTextAreaElement}*/(keyboardEv.target),
      messageInTextInput = input.value,
      messageContent = messageInTextInput.trim()
    if (
      messageContent == '' ||
      messageInTextInput == '> ' 
    ) return logdown.warn('message is empty')
    input.value = ''
    input.focus()
    resetInput(input)

    dispatch('sending_message', messageContent)
  }
</script>

<textarea class="no-bg no-outline" rows="1" placeholder="Say something :)" on:input={autoResize} on:keypress={onTyping}></textarea>

<style>
  textarea {
    color: white;
    width: 100%;
    padding: 0 0 0 5px;
    resize: none;
    background: transparent !important;
    overflow: hidden;
    overflow-y: scroll;
  }
</style>