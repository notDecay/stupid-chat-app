import { For, JSX } from "solid-js"
import stylex from "@stylexjs/stylex"
import { Avatar } from "@hope-ui/solid"
import { NameAndDescription } from "../../components"
import { useChatPage } from "../../provider/chat"
import { styleToken } from "../../utils"
import { Link, useLocation } from "@solidjs/router"
import { 
  Channel, 
  buildChannelRoute, 
  getChannelIdFromRoute
} from "../../api/channel"
import { 
  ChatMessageEvent, 
  useChatMessage 
} from "../../provider/chat/ChatMessageProvider"

const style = stylex.create({
  channel: {
    position: 'relative',
    marginRight: 10,
    cursor: 'pointer',
    '::before': {
      content: '',
      borderRadius: 8,
      position: 'absolute',
      backgroundColor: 'var(--hope-colors-neutral8)',
      opacity: 0.1,
      transition: 'opacity 0.25s ease-out'
    },
    ':hover::before': {
      opacity: 0.2
    }
  },
  channelContent: {
    display: 'flex',
    alignItems: 'center',
    gap: 15,
    paddingLeft: 5,
    paddingTop: 4,
    paddingBottom: 4,
  }
})

export function ChatChannelList() {
  const { channelList } = useChatPage()
  const { event } = useChatMessage()
  const location = useLocation()
  
  type OnClickHandler = JSX.EventHandler<HTMLDivElement, MouseEvent>
  const onClickHandler: OnClickHandler = (mouseEvent) => {
    const currentChannelId = getChannelIdFromRoute(location.pathname)
    const channelId = mouseEvent.target.id
    // don't update if we're on the same channel
    if (currentChannelId == channelId) {
      return
    }

    let lastInputText = sessionStorage.getItem(`last_input_text_${channelId}`)
    if (!lastInputText) {
      console.warn(`last input text does not found in channel ${channelId}`)
      lastInputText = ''
    }

    event.emit(ChatMessageEvent.update, {
      channel: Channel.cache.get(channelId)!,
      lastInputText
    })
  }

  return (
    <For each={channelList}>
      {it => (
        <Link href={buildChannelRoute(it.id)}>
          <div {...stylex.props(
            style.channel, 
            styleToken.fullScreen_before
          )} id={it.id} onClick={onClickHandler}>
            <div {...stylex.props(style.channelContent)}>
              <Avatar boxSize={40} />
              <NameAndDescription name={it.name} />
            </div>
          </div>
        </Link>
      )}
    </For>
  )
}