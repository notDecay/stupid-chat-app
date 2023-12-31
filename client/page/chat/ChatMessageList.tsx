import { ChatMessagesProvider } from '../../components/provider/ChatMessagesProvider'
import ChatNavBar from '../../components/chat/navbar'
import ChatMessageList from '../../components/chat/message-list'
import stylex from "@stylexjs/stylex"

const style = stylex.create({
  messageListWrapper: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  messageList: {
    display: 'flex',
    width: '100%',
    height: '100%',
  }
})

export default function MessageList() {
  return (
    <ChatMessagesProvider>
      <div {...stylex.props(style.messageListWrapper)}>
        <ChatNavBar />
        <div {...stylex.props(style.messageList)}>
          <ChatMessageList />
        </div>
      </div>
    </ChatMessagesProvider>
  )
}