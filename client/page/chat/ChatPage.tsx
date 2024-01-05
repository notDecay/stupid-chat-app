import { Outlet } from '@solidjs/router'

import { ChatSidebar, MIN_WIDTH_IN_PIXEL } from '@layout/chat/ChatSidebar'
import stylex from '@stylexjs/stylex'
import { ChatPageProvider } from '@provider'
import { createEffect, createResource, createSignal } from 'solid-js'
import { ChatSplash } from '@components'
import { logdown } from '@client/utils'
import { NotificationsProvider } from '@hope-ui/solid'

const style = stylex.create({
  app: {
    display: 'grid',
    gridTemplateColumns: {
      default: '350px 1fr',
      [`@media (max-width: ${MIN_WIDTH_IN_PIXEL}px)`]: '0 1fr'
    },
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  sidebar: {
    backgroundColor: 'var(--hope-colors-neutral2)',
    borderRightWidth: 1,
    borderRightStyle: 'solid',
    borderRightColor: 'var(--hope-colors-neutral8)',
    [`@media (max-width: ${MIN_WIDTH_IN_PIXEL}px)`]: {
      position: 'absolute',
      left: '100%',
      width: '350px',
      height: '100%',
      zIndex: 3,
    },
  },
  main: {
    width: '100%',
    height: '100%',
    [`@media (max-width: ${MIN_WIDTH_IN_PIXEL}px)`]: {
      position: 'absolute',
    },
  },
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
        <div {...stylex.props(style.app)}>
          <aside {...stylex.props(style.sidebar)}>
            <ChatSidebar.Sidebar />
          </aside>
          <main {...stylex.props(style.main)}>
            <Outlet />
          </main>
        </div>
      </ChatPageProvider>
    </NotificationsProvider>
  )
}