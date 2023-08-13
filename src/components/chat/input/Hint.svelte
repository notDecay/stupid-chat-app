<script>
  import { onMount } from "svelte"
  export let id
  export let backgroundColor

  /**@type {HTMLDivElement}*/
  let hint

  onMount(() => {
    hint.style.backgroundColor = backgroundColor
  })
</script>

<div class="{id}" bind:this={hint}>
  <slot />
</div>

<style>
  div {
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    padding: 7px 15px;
    width: calc(100% - 15px);
    /* color: #d3d3d3; */
    display: flex;
    gap: 2rem;
  }
</style>