<script>
  import { getRandomElementFromArray } from "../utils/utils"
  import { errorTitleMessages } from "./Crash"

  export let errorDetail
  const randomTitle = getRandomElementFromArray(errorTitleMessages)
</script>

<div class="crash screen">
  <div class="static"></div>
  <div class="details-container">
    <div class="details-warpper">
      <h2>{randomTitle}</h2>
      <div>{errorDetail}</div>
    </div>
  </div>
</div>

<style>
  /*  */
</style>