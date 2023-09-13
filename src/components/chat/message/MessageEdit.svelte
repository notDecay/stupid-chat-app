<script>
  import { chatPageEvent, getMessageFromId } from "./messageUtils";
  export let messageId

  const iconNames = [
    { name: 'icon-reply', id: 'reply' }
  ]

  console.log(messageId);

  /**@param {MouseEvent} thing*/
  function editSomething(thing) {
    const theEditButton = /**@type {HTMLDivElement}*/(thing.target)
    if (editBtnHas('icon-reply', theEditButton)) {
      chatPageEvent.emit('show_replying_to', getMessageFromId(messageId))
    }
  }

  /**
   * @param {string} theName
   * @param {HTMLDivElement} theEditButton
   */
  function editBtnHas(theName, theEditButton) {
    return theEditButton.className.includes(theName)
  }
</script>

<div class="edit-message-container {messageId}">
  <div class="edit-message-icons">
    {#each iconNames as icon}
      <div class="edit-button {icon.id}" on:click={editSomething}>
        <div class="icon {icon.name}"></div>
      </div>
    {/each}
  </div>
</div>

<style>
  .edit-message-container {
    position: absolute;
    margin-left: auto;
    position: absolute;
    right: 0;
    bottom: 55%;
  }

  .edit-message-icons {
    box-shadow: 1px 1px black, 1px 1px black;
    background: var(--app-second-sidebar-color);
    margin-right: 10px;
    display: none;
    align-items: center;
    gap: 15px;
    cursor: pointer;
  }
  
  .edit-message-icons .icon {
    margin: 8px;
    --icon-bound: 15px;
  }
</style>