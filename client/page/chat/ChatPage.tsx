import { Outlet } from '@solidjs/router'

import ChatSidebar from '../../layout/chat/ChatSidebar'
import stylex from '@stylexjs/stylex'
import io from 'socket.io-client'
import { ChatPageProvider } from '../../provider/ChatPageProvider'
import { createEffect, createResource, createSignal } from 'solid-js'
import ChatSplash from '../../components/chat/splash-screen'
import { logdown } from '../../utils'
import { NotificationsProvider } from '@hope-ui/solid'

const chatPageStyle = stylex.create({
  app: {
    display: 'grid',
    gridTemplateColumns: '350px 1fr',
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  sidebar: {
    backgroundColor: 'var(--hope-colors-neutral2)',
    borderRightWidth: 1,
    borderRightStyle: 'solid',
    borderRightColor: 'var(--hope-colors-neutral8)'
  }
})

async function fetcher() {
  logdown.info('fetching the chat')
  await new Promise(resolve => setTimeout(resolve, 3000 + ChatSplash.TOTAL_DELAY_IN_SECOND))
  logdown.info('chat fetching job done')
  return 
}

export default function ChatPage() {
  const [resource] = createResource(fetcher)
  const [isShowing, setIsShowing] = createSignal(resource.loading)
  const shouldOnlyShowOnProductionMode = !import.meta.env.DEV

  createEffect(() => {
    setIsShowing(resource.loading)
  })

  return (
    <NotificationsProvider>
      <ChatSplash.Screen show={isShowing() && shouldOnlyShowOnProductionMode} />
      <ChatPageProvider>
        <div {...stylex.props(chatPageStyle.app)}>
          <aside {...stylex.props(chatPageStyle.sidebar)}>
            <ChatSidebar.Sidebar />
          </aside>
          <main>
            <Outlet />
          </main>
        </div>
      </ChatPageProvider>
    </NotificationsProvider>
  )
}