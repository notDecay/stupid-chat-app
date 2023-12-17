import { Box, HTMLHopeProps } from "@hope-ui/solid"
import FullView from "./FullView"

export default function AppWrapper(props: HTMLHopeProps<"div">) {
  return (
    <FullView {...props} />
  )
}