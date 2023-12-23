import { Button, type ButtonProps } from "@hope-ui/solid"
import { BsThreeDots } from "solid-icons/bs"
import { mergeClassNames } from "../../utils"

import { stylex } from "@stylexjs/stylex"

const buttonStyle = stylex.create({
  threeDotButton: {
    paddingInlineStart: 0,
    paddingInlineEnd: 0,
    borderRadius: "50%",
    width: 40,
    height: 40
  }
})

export default function ThreeDotButton(props: ButtonProps) {
  const itsClass = mergeClassNames(stylex.props(buttonStyle.threeDotButton).className!, props.class)

  return (
    <Button 
      {...props}
      variant="subtle"
      colorScheme="neutral"
      class={itsClass}
    >
      <BsThreeDots />
    </Button>
  )
}