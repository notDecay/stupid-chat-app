import { WelcomeScreen } from "~/components"
import { duck_typing } from "~/features/chat"

export default function ChatWelcomeScreen() {
  return (
    <main>
      <WelcomeScreen text='Select a channel from the left side :)' iconUrl={duck_typing} />
    </main>
  )
}