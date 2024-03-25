import type { ParentProps } from "solid-js"
import stylex from "@stylexjs/stylex"

const style = stylex.create({
  blockquote: {
    borderLeftStyle: 'solid',
    borderLeftWidth: 5,
    borderLeftColor: 'red',
    borderRadius: 4
  },
  text: {
    marginLeft: 10
  }
})

export default function Blockquote(props: ParentProps) {
  return (
    <blockquote {...stylex.props(style.blockquote)}>
      <div {...stylex.props(style.text)}>
        {props.children}
      </div>
    </blockquote>
  )
}