<script>
  import { createEventDispatcher } from "svelte"

  export let name
  export let description = null
  export let selected = false
  export let id
  export let icon = null
  export let notificationCount = null

  const dispatch = createEventDispatcher()
</script>

<li class="{selected ? 'selected' : ''}" id="{id}" on:click={() => dispatch('switch_page', id)}>
  {#if icon}
    <div class="icon"></div>
  {/if}
  <div class="menu-item-name">
    {name}
    {#if description}
      <div class="description">{description}</div>
    {/if}
  </div>
  {#if notificationCount}
    <div class="notification-count">
      <span>{notificationCount}</span>
    </div>
  {/if}
</li>

<style>
  li {
    display: flex;
    align-items: center;
    gap: 9px;
    list-style: none;
    padding: 5px 10px 5px 24px;
    margin: 5px 0;
    transition: all 0.1s ease-out;
    cursor: pointer;
    border-radius: 5px;
  }

  li.selected,
  li:hover {
    font-weight: bold;
    background: var(--app-icon-selected-color);
  }

  .menu-item {
    display: flex;
    align-items: center;
    gap: 9px;
    list-style: none;
    padding: 5px 10px 5px 24px;
    margin: 5px 0;
    transition: all 0.1s ease-out;
    cursor: pointer;
    border-radius: 5px;
  }

  li .icon {
    --icon-url: url('https://cdn.discordapp.com/attachments/1089483298327253075/1136142944273969273/image.jpeg');
  }

  .menu-item:hover {
    font-weight: bold;
    background-color: var(--app-icon-selected-color);
  }

  .notification-count {
    margin-left: auto;
    padding: 1px 9px;
    border-radius: 8px;
    background: var(--app-notification-color);
  }

  .description {
    font-size: small;
    color: var(--app-sidebar-description-color);
  }
</style>