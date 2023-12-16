import { Box, HTMLHopeProps } from "@hope-ui/solid"

export default function AppWrapper(props: HTMLHopeProps<"div">) {
  return <Box {...props} boxSize="100%"></Box>
}