<script>
  import { getRandomElementFromArray, sleep } from '../utils/utils';
  import loadingText from './loadingText'
  export let done = false

  let loadingScreen
  const randomLoadingText = getRandomElementFromArray(loadingText)
</script>

<div class="loading screen {done ? (() => {
  sleep(1000).then(() => loadingScreen.remove())
  return 'duck-loaded'
})() : ''}" bind:this={loadingScreen}>
  <div class="random-cube">
    <div class="warpper">
      <div class="scene">
        <div class="shadow"></div>
        <div class="jumper">
          <div class="spinner">
            <div class="scaler">
              <div class="loader">
                <div class="cube">
                  <div class="cube-side"></div>
                  <div class="cube-side"></div>
                  <div class="cube-side"></div>
                  <div class="cube-side"></div>
                  <div class="cube-side"></div>
                  <div class="cube-side"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="loading-text">
    <h2>{randomLoadingText}</h2>
  </div>
</div>

<style>
  .loading {
    z-index: 10;
    background: var(--app-bg-color);
    transition: opacity 0.25s ease-out;
  }

  .loading.duck-loaded {
    /* animation: fade-out 0.25s ease-out; */
    opacity: 0;
  }

  .loading > * {
    position: fixed;
    width: 100%;
    height: 100%;
  }

  .loading-text {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  h2 {
    margin-top: auto;
    margin-bottom: 2rem;
  }

  :root {
    --size: 120;
    --coefficient: 1px;
    --timeline: 2.6s;
    --delay: 0.65s;
    --rotation-y: -24;
    --rotation-x: 28;
    --color-one: #3a0ca3;
    --color-two: #4361ee;
    --color-three: #4cc9f0;
  }

  .warpper,
  .warpper *,
  .warpper *:after,
  .warpper *:before {
    box-sizing: border-box;
    transform-style: preserve-3d;
  }

  .warpper {
    display: grid;
    place-items: center;
    min-height: 100vh;
  }

  .scene {
    position: relative;
    transform: translate3d(0, 0, 100vmin) rotateX(calc(var(--rotation-y, 0) * 1deg)) rotateY(calc(var(--rotation-x, 0) * 1deg)) rotateX(0deg);
  }

  .warpper {
    transform-origin: 50% 50%;
    animation: scale var(--timeline) var(--delay) infinite linear;
  }

  @keyframes scale {
    0%, 10% {
      transform: scaleX(1) scaleY(1);
    }
    35%, 100% {
      transform: scaleX(0.5) scaleY(0.5);
    }
  }

  .shadow {
    width: calc(var(--size) * var(--coefficient));
    position: absolute;
    bottom: 0;
    aspect-ratio: 1;
    transform-origin: 50% 50%;
    transform: rotateX(90deg) translate3d(0, 0, calc((var(--size) * (var(--coefficient) * -0.5)) - 1px)) scale(0.96);
    animation: squish-squosh var(--timeline) var(--delay) infinite, fade var(--timeline) var(--delay) infinite;
    background: rgb(75, 75, 75);
  }

  .loader {
    --depth: var(--size);
    --color: var(--color-one, #8338EC);
    width: calc(var(--depth) * var(--coefficient));
    aspect-ratio: 1;
    transform-origin: 50% 50%;
    animation: squish-squosh var(--timeline) var(--delay) infinite;
  }

  .spinner {
    animation: spin var(--timeline) var(--delay) infinite;
  }

  .jumper {
    animation: jump var(--timeline) var(--delay) infinite;
  }

  @keyframes squish-squosh {
    0%, 50%, 60% {
      scale:  1 1 1;
    }
    10%, 35% {
      scale: 1.2 0.8 1.2;
    }
    25% {
      scale: 0.8 1.2 0.8;
    }
    70% {
      scale: 1 1 2;
    }
    80% {
      scale: 2 1 2;
    }
    90%, 100% {
      scale: 2 2 2;
    }
  }


  @keyframes fade {
    0%, 10%, 40%, 50%, 60%, 100% {
      opacity: 1;
    }
    25% {
      opacity: 0.5;
    }
  }

  @keyframes spin {
    0%, 10% { rotate: 0deg; }
    30%, 100% { rotate: -360deg; }
  }
  @keyframes jump {
    0%, 10%, 35%, 50% {
      translate: 0 0;
    }
    25% {
      translate: 0 -150%;
    }
  }

  .cube {
    width: 100%;
    height: 100%;
    position: relative;
  }
  .cube-side {
    background: var(--color);
    position: absolute;
  }
  .cube-side:nth-of-type(1) {
    --b: 1.1;
    height: calc(var(--depth, 20) * var(--coefficient));
    width: 100%;
    top: 0;
    transform: translate(0, -50%) rotateX(90deg);
  }
  .cube-side:nth-of-type(2) {
    --b: 0.9;
    --color: var(--color-three, #FF006E);
    height: 100%;
    width: calc(var(--depth, 20) * var(--coefficient));
    top: 50%;
    right: 0;
    transform: translate(50%, -50%) rotateY(90deg);
  }
  .cube-side:nth-of-type(3) {
    --b: 1;
    width: 100%;
    height: calc(var(--depth, 20) * var(--coefficient));
    bottom: 0;
    transform: translate(0%, 50%) rotateX(90deg);
  }
  .cube-side:nth-of-type(4) {
    --b: 1;
    --color: var(--color-three, #FF006E);
    height: 100%;
    width: calc(var(--depth, 20) * var(--coefficient));
    left: 0;
    top: 50%;
    transform: translate(-50%, -50%) rotateY(90deg);
  }
  .cube-side:nth-of-type(5) {
    --b: 1;
    --color: var(--color-two, #3A86EF);
    height: 100%;
    width: 100%;
    transform: translate3d(0, 0, calc(var(--depth, 20) * (var(--coefficient) * 0.5)));
    top: 0;
    left: 0;
  }
  .cube-side:nth-of-type(6) {
    --b: 1.2;
    height: 100%;
    width: 100%;
    transform: translate3d(0, 0, calc(var(--depth, 20) * (var(--coefficient) * -0.5))) rotateY(180deg);
    top: 0;
    left: 0;
  }
</style>