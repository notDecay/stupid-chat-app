import { Button, type ButtonProps } from "@hope-ui/solid"
import { BsThreeDots } from "solid-icons/bs"

import stylex from "@stylexjs/stylex"

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
  return (
    <Button 
      {...props}
      variant="subtle"
      colorScheme="neutral"
      class={props.class}
      {...stylex.props(buttonStyle.threeDotButton)}
    >
      <BsThreeDots />
    </Button>
  )
}