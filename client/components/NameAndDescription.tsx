import { Heading } from "@hope-ui/solid"
import stylex from "@stylexjs/stylex"
import { Show, type JSX } from "solid-js"

const style = stylex.create({
  description: {
    color: 'var(--hope-colors-neutral11)'
  },
  name: {
    fontSize: 17,
  }
})

interface INameAndDescriptionProps {
  name: JSX.Element
  description?: JSX.Element
}

export function NameAndDescription(props: INameAndDescriptionProps) {
  return (
    <div>
      <Heading {...stylex.props(style.name)}>
        {props.name}
      </Heading>
      <Show when={props.description}>
        <div {...stylex.props(style.description)}>
          {props.description}
        </div>
      </Show>
    </div>
  )
}