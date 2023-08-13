<script>
  import { makeid } from "../../utils/utils"
  import ChatMessageInput from "../../components/chat/ChatMessageInput.svelte"
  import { chatPageEvent, createNewMessage } from "../../components/chat/message/messageUtils"
  export let syncMessages = true

  if (window.__app__.mode == 'production' && syncMessages) {
    socket.on('message', (message) => {
      createNewMessage(message)
    })
  }

  /**@type {HTMLDivElement} */
  let chatPage
  chatPageEvent.on('send_message', (messageContent, repliedMessage) => {
    console.log('replied message:', repliedMessage);
    const messageToSend = {
      author: {
        iconUrl: '',
        id: /**@type {UserId}*/(sessionStorage.getItem('user_id')),
        name: 'Anonymous'
      },
      content: messageContent,
      messageId: makeid(20),
      replyTo: repliedMessage
    }

    if (window.__app__.mode == 'production' && syncMessages) {
      return socket.emit('message', messageToSend)
    }

    createNewMessage(messageToSend)
    chatPage.scrollTop = chatPage.scrollHeight
  })
</script>

<div class="chat-page" bind:this={chatPage}>
  <div class="chat-content"></div>
  <ChatMessageInput on:send_message={(message) => {
    chatPageEvent.emit('send_message', message.detail.messageTyped, message.detail.repliedTo)
  }} />
</div>

<style>
  .chat-page {
    height: 100%;
    position: relative;
    grid-template-rows: auto 3.75rem;
  }

  .chat-content {
    max-height: 82.5vh;
    padding-top: 1rem;
    overflow-y: scroll;
  }

  ::-webkit-scrollbar {
    background: var(--chat-scroll-bar-color);
    border-radius: 5px;
    width: 13px;
  }

  ::-webkit-scrollbar-thumb {
    width: 5px;
    background: var(--app-second-sidebar-color);
  }
</style>