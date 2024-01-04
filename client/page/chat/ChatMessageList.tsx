import { ChatMessagesProvider } from '../../provider/ChatMessagesProvider'
import ChatNavBar from '../../layout/chat/ChatNavbar'
import ChatMessageList from '../../components/chat/message-list'
import stylex from "@stylexjs/stylex"

const style = stylex.create({
  messageListWrapper: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  }
})

export default function MessageList() {
  return (
    <ChatMessagesProvider>
      <div {...stylex.props(style.messageListWrapper)}>
        <ChatNavBar />
        <ChatMessageList />
      </div>
    </ChatMessagesProvider>
  )
}