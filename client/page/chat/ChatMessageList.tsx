import { ChatMessagesProvider } from "../../components/provider/ChatMessagesProvider"
import ChatNavBar from "../../components/chat/navbar"
import ChatMessageContent from "../../components/chat/main-content/ChatMessageContent"
import { stylex } from "@stylexjs/stylex"

const chatMessageStyle = stylex.create({
  messageListWrapper: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  messageList: {
    display: "flex",
    width: "100%",
    height: "100%",
  }
})

export default function MessageList() {
  return (
    <ChatMessagesProvider>
      <div {...stylex.props(chatMessageStyle.messageListWrapper)}>
        <ChatNavBar />
        <div {...stylex.props(chatMessageStyle.messageList)}>
          <ChatMessageContent />
        </div>
      </div>
    </ChatMessagesProvider>
  )
}