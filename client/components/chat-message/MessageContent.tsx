import { onMount } from "solid-js"
import type { IUserMessageProps } from "./UserMessage"
import { Box } from "@hope-ui/solid"

import style from "./MessageContent.module.scss"

export default function MessageContent(props: IUserMessageProps) {
  let messageContent: HTMLDivElement

  onMount(() => {
    messageContent.innerHTML = props.content
  })

  return (
    <Box 
      backgroundColor="$neutral4" 
      px="8px" 
      class={style.content}
      ref={messageContent!}
    />
  )
}