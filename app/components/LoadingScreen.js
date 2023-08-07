import { render } from "../utils/utils.js"

/**@type {FunctionalComponent<{}, ComponentCreatable | ComponentDisposable>} */
export default function() {
  const loadingScreen = /*html*/`
    <div class="loading-screen screen">
      <link rel="stylesheet" href="./res/style/home.css">
    </div>
  `

  return {
    create() {
      render(loadingScreen).to('.app-mount')
    }
  }
}