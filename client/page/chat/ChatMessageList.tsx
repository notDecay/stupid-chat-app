import { ChatMessagesProvider } from '@provider'
import ChatNavBar, { ChatNavBarAction } from '@layout/chat/ChatNavbar'
import { ChatMessageList, ChannelInfo } from '@components'
import stylex from "@stylexjs/stylex"
import { Show, createSignal } from 'solid-js'

const style = stylex.create({
  messageListWrapper: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    width: '100%',
    height: '100%',
    display: 'grid',
    // transition: 'grid-template-columns 1.25s ease-out',
    gridTemplateColumns: '1fr 0fr',
  },
  channelInfoShow: {
    gridTemplateColumns: '1.4fr 1fr'
  }
})

export default function MessageList() {
  const [isShowingChannelInfo, setIsShowingChannelInfo] = createSignal(false)

  const onActionClickedHandler = (action: ChatNavBarAction) => {
    switch (action) {
      case ChatNavBarAction.MoreOption: {
        setIsShowingChannelInfo(previous => !previous)
      } break
    }
  }

  return (
    <ChatMessagesProvider>
      <div {...stylex.props(
        style.content,
        isShowingChannelInfo() ? style.channelInfoShow : {}
      )}>
        <div {...stylex.props(style.messageListWrapper)}>
          <ChatNavBar onActionClicked={onActionClickedHandler} />
          <ChatMessageList />
        </div>
        <Show when={isShowingChannelInfo()}>
          <ChannelInfo />
        </Show>
      </div>
    </ChatMessagesProvider>
  )
}