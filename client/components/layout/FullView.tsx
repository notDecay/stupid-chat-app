import { Box, type ElementType, type HTMLHopeProps } from "@hope-ui/solid"

export default function FullView<T extends ElementType<any>>(props: HTMLHopeProps<T>) {
  return (
    <Box {...props} boxSize="100%" />
  )
}