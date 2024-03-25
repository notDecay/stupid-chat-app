import type { ParentProps } from "solid-js"
import stylex from "@stylexjs/stylex"

const style = stylex.create({
  paragraph: {
    lineBreak: 'auto',
    whiteSpace: 'pre-wrap'
  }
})

export default function Paragraph(props: ParentProps) {
  return (
    <p {...stylex.props(style.paragraph)}>
      {props.children}
    </p>
  )
}