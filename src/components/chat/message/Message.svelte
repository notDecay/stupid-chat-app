<script>
  import { onMount } from "svelte"
  import MessageEdit from "./MessageEdit.svelte"

  /**@type {IMessageProps} */
  export let message
  export let isFollowUpMessage = false
  /**@type {HTMLParagraphElement} */
  let messageContent
  let repliedMessageContent
  onMount(() => {
    messageContent.innerHTML = message.content
    if (repliedMessageContent) {
      repliedMessageContent.innerHTML = message.replyTo.renderedMessage
    }
  })
</script>

{#if isFollowUpMessage}
<div class="message last-message" message-id="{message.messageId}" user-id="{message.author.id}">
  {#if message.replyTo}
    <div class="message-reply">
      <div class="author icon"></div>
      <div class="author-name">{message.replyTo.author.name}</div>
      <div class="content" bind:this={repliedMessageContent}></div>
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
  <MessageEdit messageId={message.messageId} />
</div>
{:else}
<div class="message follow-up last-message" message-id="{message.messageId}" user-id="{message.author.id}">
  <div class="content">
    <p bind:this={messageContent}></p>
  </div>
  <MessageEdit messageId={message.messageId} />
</div>
{/if}