import type { JSX } from "solid-js"
// ...
import { Textarea } from "@hope-ui/solid"

interface IEditingMessagePromptProps {
  rawMessageContent: string
}

export default function EditingMessagePrompt(props: IEditingMessagePromptProps) {
  type OnKeyboardHandler = JSX.EventHandler<HTMLTextAreaElement, KeyboardEvent> 
  // const keyboardHandler: OnKeyboardHandler = (keyboardEvent) => {
  //   if (!isSendingMessage(keyboardEvent)) return
  // }

  return (
    <Textarea value={props.rawMessageContent} />
  )
}