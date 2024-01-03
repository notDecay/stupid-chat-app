import { Box } from "@hope-ui/solid"
import type { 
  IUserMessageProps 
} from "."
import MessageDate from "./MessageDate"

export default function MessageContent(props: IUserMessageProps) {
  return (
    <div class="message-content">
      <MessageDate {...props} />
      <Box 
        backgroundColor="$neutral4" 
        px="8px" 
        class="content"
        innerHTML={props.content}
      />
    </div>
  )
}