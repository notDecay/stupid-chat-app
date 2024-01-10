import { 
  type CloseButtonProps,
} from "@hope-ui/solid"

import {
  BsThreeDots
} from "solid-icons/bs"
import { CircleCloseButton } from "./CircleCloseButton"

interface ICircleCloseButtonProps extends CloseButtonProps {
  // ...
}

export function ThreeDotButton(props: ICircleCloseButtonProps) {
  return (
    <CircleCloseButton {...props}>
      <BsThreeDots size={17} />
    </CircleCloseButton>
  )
}