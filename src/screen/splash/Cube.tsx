import { Component } from "solid-js"

const Cube: Component = () => {
  return (
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
  )
}

export default Cube