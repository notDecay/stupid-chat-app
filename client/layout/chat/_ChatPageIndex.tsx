import stylex from "@stylexjs/stylex"
import { styleToken } from "../../utils"
import { Outlet, useRouteData } from "@solidjs/router"
import { Resource } from "solid-js"
import { 
  ChatPageProvider, 
  type IChatPageContext 
} from "../../provider/chat"
import { ChatChannelList } from "../../features/chat"
import { ChatMessageProvider } from "../../provider/chat/ChatMessageProvider"

import ChatSidebar from "./ChatSidebar"
import ChatSidebarContent from "./ChatSidebarContent"

const minWidth = '@media (max-width: 950px)'

const style = stylex.create({
  app: {
    display: 'grid',
    gridTemplateColumns: {
      default: 'auto 1fr',
      [minWidth]: '1fr'
    },
    position: 'relative'
  }
})

export default function ChatPageIndex() {
  const data = useRouteData() as unknown as Resource<IChatPageContext>
  
  return (
    <ChatPageProvider value={data()!}>
      <div {...stylex.props(
        style.app,
        styleToken.fullScreen
      )}>
        <ChatMessageProvider>
          <ChatSidebar>
            <ChatSidebarContent>
              <ChatChannelList />
            </ChatSidebarContent>
          </ChatSidebar>
          <Outlet />
        </ChatMessageProvider>
      </div>
    </ChatPageProvider>
  )
}