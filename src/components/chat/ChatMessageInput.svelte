<script>
  import { createEventDispatcher } from "svelte"
  import logdown from "../../utils/logdown.js"
  import ReplyingToHint from "./input/ReplyingToHint.svelte"
  import EventEmitter from "../../utils/EventEmitter.js"
  import { chatPageEvent } from "./message/messageUtils.js"

  const dispatch = createEventDispatcher()
  const chatInputEvent = new EventEmitter()
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
    dispatch('send_message', {
      messageTyped: messageContent,
      repliedTo: lastRepliedMessage
    })

    chatInputEvent.emit('hide_replying_to')
  }

  /**@param {KeyboardEvent} keyboardEv */
  function dismissAnyStuffAboveDaInput(keyboardEv) {
    if (keyboardEv.key !== 'Escape') return
    chatInputEvent.emit('hide_replying_to')
    logdown.info('dismissed')
  }

  /**@type {IMessageProps | null}*/
  let lastRepliedMessage = null, lastMessageId = ''
  /**@type {HTMLDivElement} */
  let anyHint
  chatPageEvent.on('show_replying_to', (repliedMessage) => {
    if (lastMessageId === repliedMessage.messageId) {
      return logdown.warn(`Message "${repliedMessage.messageId}" - already shown`)
    }

    new ReplyingToHint({
      target: anyHint,
      props: { repliedMessage }
    })

    lastMessageId = repliedMessage.messageId
    lastRepliedMessage = repliedMessage
  })

  chatInputEvent.on('hide_replying_to', () => {
    lastRepliedMessage ? (() => {
      hideHints()
      lastRepliedMessage = lastMessageId = null
    })() : 0
  })

  function hideHints() {
    anyHint.children[0].remove()
  }
</script>

<div class="input-container">
  <div bind:this={anyHint}>
    <!--  -->
  </div>
  <div class="message-input">
    <div class="upload">
      <div class="icon icon-plus"></div>
    </div>
    <textarea class="no-bg no-outline" rows="1" placeholder="Say something :)" on:input={autoResize} on:keypress={onTyping} on:keyup={dismissAnyStuffAboveDaInput}></textarea>
  </div>
</div>

<style>
  .input-container {
    position: absolute;
    bottom: 0;
    width: 100%;
  }

  textarea {
    width: 100%;
    padding: 0 0 0 5px;
    resize: none;
    background: transparent !important;
    overflow: hidden;
    overflow-y: scroll;
  }

  .message-input {
    display: flex;
    align-items: center;
    gap: 20px;
    background: var(--chat-message-input-color);
    margin-bottom: 10px;
    padding: 15px;
    border-radius: 10px;
  }

  .upload {
    padding: 5px;
  }
</style>