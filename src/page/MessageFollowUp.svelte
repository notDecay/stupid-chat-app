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

<div class="message follow-up last-message" message-id="{message.messageId}" user-id="{message.author.id}">
  <div class="content">
    <p bind:this={messageContent}></p>
  </div>
  <MessageEdit />
</div>