<script>
  export let name
  export let showArrowIcon = true
</script>

<section>
  <div class="section-title">
    {#if showArrowIcon}
      <div class="icon icon-arrow"></div>
    {/if}
    <h3>{name}</h3>
  </div>
  <ul>
    <slot />
  </ul>
</section>

<style>
  section {
    padding: var(--app-space);
  }

  ul {
    padding-inline-start: 0px;
    margin-bottom: 3rem;
  }

  .section-title {
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 7px 0;
  }

  h3 {
    margin: 0;
  }

  .icon {
    --icon-bound: 14px;
    transition: background-color 0.15s ease-out;
    cursor: pointer;
    padding: 4px;
  }

  .icon:hover {
    background-color: var(--app-icon-selected-color);
  }
</style>