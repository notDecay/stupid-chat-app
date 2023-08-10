<script>
  const iconNames = ['icon-reply']
</script>

<div class="edit-message-container">
  <div class="edit-message-icons">
    {#each iconNames as icon}
      <div class="this-is edit-button bro" aria-label="button">
        <div class="icon {icon}"></div>
      </div>
    {/each}
  </div>
</div>