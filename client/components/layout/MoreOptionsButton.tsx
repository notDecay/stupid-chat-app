import { Button, type ButtonProps } from "@hope-ui/solid"
import { BsThreeDots } from "solid-icons/bs"
import { mergeClassNames } from "../../utils"

import style from "./MoreOptionsButton.module.scss"

export default function MoreOptionsButton(props: ButtonProps) {
  const itsClass = mergeClassNames(style["more-options-button"], props.class)

  return (
    <Button 
      {...props}
      variant="subtle"
      colorScheme="neutral"
      boxSize={40}
      // override the hope-ui's button padding to show the 3 dots icon
      class={itsClass}
    >
      <BsThreeDots />
    </Button>
  )
}