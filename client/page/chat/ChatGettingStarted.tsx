import { Anchor } from "@hope-ui/solid"
import ChatSidebar from "../../components/chat/sidebar"
import Welcome from "../../components/layout/Welcome"
import { Show } from "solid-js"

import { useRouteData } from "@solidjs/router"
import type { ChatPageData } from "./data"

import duck_typing from "../../assets/images/duck_typing.gif"
import duck_wait_for_message from "../../assets/images/duck_wait_for_message.png"

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
    <Welcome.Screen>
      <Welcome.Icon iconUrl={duck_typing} />
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
    <Welcome.Screen>
      <Welcome.Icon iconUrl={duck_wait_for_message} />
      <Welcome.Text>
        <div>Hmm... no channel.</div>
        <div>
          Add some friend or join a group to get started 
        </div>
      </Welcome.Text>
    </Welcome.Screen>
  )
}