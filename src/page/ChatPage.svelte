<script>
  import { makeid } from "../utils/utils";
  import ChatMessageInput from "./ChatMessageInput.svelte"
  import ReplyToAuthor from "./ReplyToAuthor.svelte";
  import { createNewMessage } from "./messageUtils";
  // let showReplyAuthor = false

  function sendingMessage(messageContent) {
    if (window.__app__.mode == 'production') {
      return socket.emit('message', messageContent)
    }

    createNewMessage({
      author: {
        iconUrl: '',
        id: sessionStorage.getItem('user_id'),
        name: 'Anonymous'
      },
      content: messageContent.detail,
      messageId: makeid(20)
    })
  }

  if (window.__app__.mode == 'production') {
    socket.on('message', (messageContent) => {
      createNewMessage(messageContent)
    })
  }
</script>

<link rel="stylesheet" href="../src/page/Message.css">
<div class="chat-page">
  <div class="chat-content">
    
  </div>
  <div class="chat-msg-input-container">
    <div>
      <!-- <svelte:component this={optionSelected.component} /> -->
    </div>
    <div class="message-input">
      <div class="upload">
        <div class="icon icon-plus"></div>
      </div>
      <ChatMessageInput on:sending_message={sendingMessage} />
    </div>
  </div>
</div>

<style>
  :root {
    --chat-message-selected-color: #434352;
    --chat-message-input-color: #18171d;
    --chat-scroll-bar-color: #23232c;
  }

  .chat-page {
    height: 100%;
    padding: var(--app-space) 0 0 var(--app-space) ;
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
    background: var(--app-sidebar-color);
  }

  .chat-msg-input-container {
    position: absolute;
    bottom: 0;
    width: 100%;
  }

  .chat-msg-input-container .message-input {
    display: flex;
    align-items: center;
    gap: 20px;
    background: var(--chat-message-input-color);
    margin-bottom: 10px;
    padding: 15px;
    border-radius: 10px;
  }

  .chat-msg-input-container .upload {
    padding: 5px;
  }
</style>