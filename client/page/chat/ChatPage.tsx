import { Outlet } from "@solidjs/router"

import ChatSidebar from "../../components/chat/sidebar"
import stylex from "@stylexjs/stylex"

const chatPageStyle = stylex.create({
  app: {
    display: "grid",
    gridTemplateColumns: "350px 1fr",
    position: "relative",
    width: "100%",
    height: "100%"
  },
  sidebar: {
    backgroundColor: "var(--hope-colors-neutral2)",
    borderRight: "1px solid var(--hope-colors-neutral8)"
  }
})

export default function ChatPage() {
  return (
    <>
      {/* <SplashScreen show={true} /> */}
      <div {...stylex.props(chatPageStyle.app)}>
        <aside {...stylex.props(chatPageStyle.sidebar)}>
          <ChatSidebar.Sidebar />
        </aside>
        <main>
          <Outlet />
        </main>
      </div>
    </>
  )
}