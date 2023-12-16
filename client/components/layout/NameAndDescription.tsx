import { Heading } from "@hope-ui/solid"
import { Show, type JSX } from "solid-js"

interface INameAndDescriptionProps {
  name: JSX.Element
  description?: JSX.Element
}

export default function NameAndDescription(props: INameAndDescriptionProps) {
  return (
    <div>
      <Heading>{props.name}</Heading>
      <Show when={props.description}>
        <div>{props.description}</div>
      </Show>
    </div>
  )
}