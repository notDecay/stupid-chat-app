import { Heading } from "@hope-ui/solid"
import stylex from "@stylexjs/stylex"
import { type ParentProps, mergeProps } from "solid-js"

const style = stylex.create({
  heading: {
    width: '100%',
    textAlign: 'center',
    marginTop: 15,
    marginBottom: 15
  }
})

export default function FormHeader(props: ParentProps) {
  return (
    <Heading size="3xl" {...stylex.props(style.heading)}>
      {props.children}
    </Heading>
  )
}