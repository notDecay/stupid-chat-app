<script>
    import { createEventDispatcher } from "svelte";

  export let name
  export let description

  const dispatch = createEventDispatcher()
</script>

<div class="setting-page">
  <div>
    <h1>
      {name}
      <div class="close-setting">
        <div class="icon icon-x" on:click={() => dispatch('close_setting', null)}></div>
      </div>
    </h1>
    <div>{description}</div>
  </div>
  <div>
    <slot />
  </div>
</div>

<style>
  .setting-page {
    padding: var(--app-space);
  }

  .close-setting {
    margin-left: auto;
    padding: 5px;
  }

  .close-setting:hover {
    background: var(--app-icon-selected-color);
  }

  h1 {
    margin-top: 0;
    margin-bottom: 5px;
    color: #d1d1d1;
    display: flex;
    align-items: center;
  }
</style>