import type { JSX } from "solid-js"
import { mergeClassNames } from "../../../utils"

import "./MessageWrapUp.scss"

interface IMessageWrapUpProps extends JSX.HTMLAttributes<HTMLDivElement> {
  // ...
}

export default function MessageWrapUp(props: IMessageWrapUpProps) {
  return (
    <div 
      {...props} 
      class={mergeClassNames("message-wrap-up", props.class)}
      data-label="message"
    >
      {props.children}
    </div>
  )
}