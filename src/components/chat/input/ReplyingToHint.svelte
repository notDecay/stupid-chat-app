<script>
  import { onMount } from "svelte"
  import Hint from "./Hint.svelte"

  /**@type {IMessageCache}*/
  export let repliedMessage
  /**@type {HTMLDivElement}*/
  let repliedMessageContent
  onMount(() => {
    repliedMessageContent.innerHTML = repliedMessage.renderedMessage
  })

  u('.reply-user-warpper').remove()
</script>

<Hint id="reply-user-warpper" backgroundColor="var(--app-second-sidebar-color)">
  <div class="reply-to-author">Replying to <span class="reply-author">{repliedMessage.author.name}</span></div>
  <div class="reply-msg-content" bind:this={repliedMessageContent}></div>
</Hint>

<style>
  .reply-author {
    font-weight: bold;
    color: var(--app-text-color);
  }

  .reply-msg-content {
    display: inline-block;
    text-overflow: ellipsis;
    width: 70%;
    white-space: nowrap;
  }
</style>