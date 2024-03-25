import type { ParentProps } from "solid-js"
import type { ResourceProps } from "solid-marked/compiler"
import stylex from "@stylexjs/stylex"

const style = stylex.create({
  link: {
    ':hover': {
      textDecoration: 'underline',
    }
  }
})

export default function Link(props: ResourceProps & ParentProps) {
  return (
    <a
      href={props.url} 
      data-open-confirmation-prompt
      {...stylex.props(style.link)}
    >{props.children}</a>
  )
}