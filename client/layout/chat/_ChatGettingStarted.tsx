import { WelcomeScreen } from "../../components"
import { Anchor } from "@hope-ui/solid"
import { Show } from "solid-js"
import { useChatPage } from "../../provider/chat"
import { Channel } from "../../api/channel"

import duck_typing from "../../assets/images/duck_typing.gif"
import duck_wait_for_message from "../../assets/images/duck_wait_for_message.png"

export default function ChatGettingStarted() {
  const { channelList } = useChatPage()
  
  const isHasChannel = !Channel.isChannelListEmpty(channelList)

  return (
    <main>
      <Show when={isHasChannel} fallback={
        <WelcomeScreen iconUrl={duck_wait_for_message} text={<>
          <div>No channel.</div>
          <div>Add some friend to get started...</div>
        </>} />
      }>
        <WelcomeScreen iconUrl={duck_typing} text={<>
          <div>Select a channel</div>
          <div>from the <Anchor color="$primary10">left side</Anchor> to get started :)</div>
        </>} />
      </Show>
    </main>
  )
}