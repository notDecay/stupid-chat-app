import { JSX, ParentProps } from "solid-js"

import style from "./MessageWrapUp.module.scss"
import { mergeClassNames } from "../../utils"

export default function MessageWrapUp(props: JSX.HTMLAttributes<HTMLDivElement>) {
  return (
    <div 
      {...props} 
      class={mergeClassNames(style["message-wrap-up"], props.class)}
      data-label="message"
    >
      {props.children}
    </div>
  )
}