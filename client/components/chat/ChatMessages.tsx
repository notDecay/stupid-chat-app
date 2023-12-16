import type { ParentProps } from "solid-js"
import { Box } from "@hope-ui/solid"

import style from "./ChatMessages.module.scss"

export default function ChatMessages(props: ParentProps) {
  return (
    <Box class={style["chat-messages"]} boxSize="100%">
      {props.children}
    </Box>
  )
}