import { Box, Center, type CenterProps } from "@hope-ui/solid"
import FullView from "./FullView"

import style from "./Welcome.module.scss"
import { ParentProps } from "solid-js"
import { mergeClassNames } from "../../utils"

namespace Welcome {
  export function Screen(props: CenterProps) {
    return (
      <Center as={FullView} flexDirection="column" class={mergeClassNames(style["welcome"], props.class)}>
        {props.children}
      </Center>
    )
  }

  export function Icon(props: ParentProps) {
    return (
      <div class={style.icon}>
        {props.children}
      </div>
    )
  }

  export function Text(props: ParentProps) {
    return (
      <span class={style.text}>
        {props.children}
      </span>
    )
  }
}

export default Welcome