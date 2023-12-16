import { 
  Flex 
} from "@hope-ui/solid"
import { 
  ChatNavBar, 
  ChatMessages, 
  ChatMessagesProvider,
} from "../../components"

import style from "./ChatMessage.module.scss"
import ChatMessageContent from "./ChatMessageContent"

export default function ChatMessageView() {
  return (
    <ChatMessagesProvider>
      <Flex class={style["chat-message"]} boxSize="100%">
        <ChatNavBar />
        <ChatMessages>
          <ChatMessageContent />
        </ChatMessages>
      </Flex>
    </ChatMessagesProvider>
  )
}