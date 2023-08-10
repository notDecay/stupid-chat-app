<script>
  export let author
  export let content
</script>

<div class="empty">
  <div class="reply-to-author">Replying to <span class="reply-author">{author.name}</span></div>
  <div class="reply-msg-content">{content}</div>
</div>