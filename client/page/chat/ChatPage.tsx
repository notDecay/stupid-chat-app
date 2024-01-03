import { Outlet } from '@solidjs/router'

import ChatSidebar from '../../components/chat/sidebar'
import stylex from '@stylexjs/stylex'
import io from 'socket.io-client'
import { ChatPageProvider } from '../../components/provider/ChatPageProvider'
import { createEffect, createResource, createSignal } from 'solid-js'
import ChatSplash from '../../components/chat/splash-screen'
import { logdown } from '../../utils'

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

export const socket = io()

async function fetcher() {
  logdown.info('fetching the chat')
  await new Promise(resolve => setTimeout(resolve, 3000 + ChatSplash.TOTAL_DELAY_IN_SECOND))
  logdown.info('chat fetching job done')
  return 
}

export default function ChatPage() {
  const [resource] = createResource(fetcher)
  const [isShowing, setIsShowing] = createSignal(resource.loading)

  createEffect(() => {
    setIsShowing(resource.loading)
  })

  return (
    <>
      <ChatSplash.Screen show={isShowing()} />
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
    </>
  )
}