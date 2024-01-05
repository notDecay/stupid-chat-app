import type { JSX } from "solid-js"
import stylex from "@stylexjs/stylex"
import { mergeClassNames } from "@client/utils"

interface IMessageWrapUpProps extends JSX.HTMLAttributes<HTMLDivElement> {
  // ...
}

const messageWrapUpStyle = stylex.create({
  messageWrapUp: {
    paddingTop: 2,
    paddingLeft: 10,
    marginBottom: 2,
    position: "relative",
  }
})

export default function MessageWrapUp(props: IMessageWrapUpProps) {  
  return (
    <div 
      {...props} 
      class={mergeClassNames(
        stylex.props(messageWrapUpStyle.messageWrapUp).className!,
        props.class
      )}
      data-label="message"
    >
      {props.children}
    </div>
  )
}