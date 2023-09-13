<script>
  import Loading from "./screen/Loading.svelte"
  import Home from "./screen/Home.svelte"
  import Crash from "./screen/Crash.svelte"
  import { sleep } from "./utils/utils"
  import { onMount } from "svelte"

  let doneLoading = false
  async function start() {
    await sleep(1000)
    new Home({
      target: document.querySelector('.app-mount')
    })
    await sleep(4000)
    await sleep(500)
    doneLoading = true
  }

  onMount(start)
</script>

{#if /*window.__app__.mode == 'test'*/ false}
  <Home />
{:else}
  <Loading done={doneLoading} />
{/if}