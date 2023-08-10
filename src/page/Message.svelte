<script>
  import { onMount } from "svelte";
  import MessageEdit from "./MessageEdit.svelte";

  /**@type {IMessageProps} */
  export let message
  /**@type {HTMLParagraphElement} */
  let messageContent
  onMount(() => {
    messageContent.innerHTML = message.content
    console.log(messageContent, message.content);
  })
</script>

<div class="message last-message" message-id="{message.messageId}" user-id="{message.author.id}">
  {#if message.replyTo}
    <div class="message-reply">
      <div class="author icon"></div>
      <div class="author-name">{message.replyTo.author.name}</div>
      <div class="content">{message.replyTo.content}</div>
    </div>
  {/if}
  <div class="message-content-container">
    <div>
      <div class="author icon"></div>
    </div>
    <div class="warpper">
      <div class="author-name">{message.author.name}</div>
      <div class="content">
        <p bind:this={messageContent}></p>
      </div>
    </div>
  </div>
  <MessageEdit />
</div>