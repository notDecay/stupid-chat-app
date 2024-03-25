import { 
  type CloseButtonProps,
} from "@hope-ui/solid"

import {
  BsThreeDots
} from "solid-icons/bs"
import { CircleButton } from "./CircleButton"

interface ICircleButtonProps extends CloseButtonProps {
  // ...
}

export function ThreeDotButton(props: ICircleButtonProps) {
  return (
    <CircleButton {...props}>
      <BsThreeDots size={17} />
    </CircleButton>
  )
}