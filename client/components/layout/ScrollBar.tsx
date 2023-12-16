import { type JSX, mergeProps, type ParentProps } from "solid-js"

import style from "./ScrollBar.module.scss"
import { mergeClassNames } from "../../utils"

interface IScrollBarProps extends JSX.HTMLAttributes<HTMLDivElement> {
  // ...
}

export default function ScrollBar(props: IScrollBarProps) {
  return (
    <div {...props} class={mergeClassNames(style["scroll-bar"], props.class)} />
  )
}