import "./JumpingCube.scss"

export default function JumpingCube() {
  return (
    <div class="warpper">
      <div class="scene">
        <div class="shadow"></div>
        <div class="jumper">
          <div class="spinner">
            <div>
              <div class="loader">
                <div class="cube">
                  <div class="cube-side" />
                  <div class="cube-side" />
                  <div class="cube-side" />
                  <div class="cube-side" />
                  <div class="cube-side" />
                  <div class="cube-side" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}