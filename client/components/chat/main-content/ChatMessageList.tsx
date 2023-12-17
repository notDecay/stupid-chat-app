import { Flex } from "@hope-ui/solid"
import FullView from "../../layout/FullView"
import { ChatMessagesProvider } from "../../provider/ChatMessagesProvider"
import ChatNavBar from "../navbar"
import ChatMessageContent from "./ChatMessageContent"

export default function MessageList() {
  return (
    <ChatMessagesProvider>
      <FullView as={Flex} flexDirection="column">
        <ChatNavBar />
        <Flex as={FullView}>
          <ChatMessageContent />
        </Flex>
      </FullView>
    </ChatMessagesProvider>
  )
}