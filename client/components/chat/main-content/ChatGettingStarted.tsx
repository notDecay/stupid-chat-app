import { Anchor, Box } from "@hope-ui/solid"
import ChatSidebar from "../sidebar"
import Welcome from "../../layout/Welcome"
import { Show } from "solid-js"

import style from "./ChatGettingStarted.module.scss"
import { useRouteData } from "@solidjs/router"
import type { ChatPageData } from "../../../page/chat/data"

export default function GettingStarted() {
  const chatPageData = useRouteData<ChatPageData>()

  return (
    <Show when={chatPageData.channelList()} fallback={<NoChannel />}>
      <ChatWelcome />
    </Show>
  )
}

function ChatWelcome() {
  return (
    <Welcome.Screen class={style.welcome}>
      <Welcome.Icon>
        <Box width="19rem" height="15rem" class={style.icon} />
      </Welcome.Icon>
      <Welcome.Text>
        <div>Select a channel</div>
        <div>
          from the <Anchor onClick={ChatSidebar.flashSidebar}>left side</Anchor> to get started :)
        </div>
      </Welcome.Text>
    </Welcome.Screen>
  )
}

function NoChannel() {
  return (
    <Welcome.Screen class={style["no-channel"]}>
      <Welcome.Icon>
        <Box width="19rem" height="15rem" class={style.icon} />
      </Welcome.Icon>
      <Welcome.Text>
        <div>Hmm... no channel.</div>
        <div>
          Add some friend or join a group to get started 
        </div>
      </Welcome.Text>
    </Welcome.Screen>
  )
}