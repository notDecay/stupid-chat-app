import { 
  Flex 
} from "@hope-ui/solid"
import { 
  ChatNavBar, 
  ChatMessages, 
  ChatMessagesProvider,
  FullView,
} from "../../components"

import style from "./ChatMessage.module.scss"
import ChatMessageContent from "./ChatMessageContent"

export default function ChatMessageView() {
  return (
    <ChatMessagesProvider>
      <FullView class={style["chat-message"]} as={Flex}>
        <ChatNavBar />
        <ChatMessages>
          <ChatMessageContent />
        </ChatMessages>
      </FullView>
    </ChatMessagesProvider>
  )
}