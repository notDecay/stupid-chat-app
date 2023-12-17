import { 
  Grid, 
} from "@hope-ui/solid"
import { 
  AppWrapper, 
} from "../../components"
import { Outlet } from "@solidjs/router"

import style from "./ChatPage.module.scss"
import ChatSidebar from "../../components/chat/sidebar"

export default function ChatPage() {
  return (
    <>
      {/* <SplashScreen show={true} /> */}
      <Grid as={AppWrapper} templateColumns="350px 1fr" class={style.app}>
        <aside>
          <ChatSidebar.Sidebar />
        </aside>
        <main>
          <Outlet />
        </main>
      </Grid>
    </>
  )
}