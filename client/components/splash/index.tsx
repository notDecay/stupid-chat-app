import { createSignal } from "solid-js"
import FullView from "../layout/FullView"

import style from "./index.module.scss"
import { mergeClassNames } from "../../utils"

export default function SplashScreen(props: {
  show: boolean
}) {
  const [shouldShowing, setShouldShowing] = createSignal(props.show)

  return (
    <FullView background="$background" zIndex="$modal" class={mergeClassNames(
      style["splash-screen"],
      shouldShowing() ? style.show : style.hide
    )}>
      {/*  */}
    </FullView>
  )
}