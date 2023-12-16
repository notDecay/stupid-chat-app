import { Avatar, Flex, Spacer } from "@hope-ui/solid"
import { NameAndDescription, MoreOptionsButton } from ".."

import style from "./ChatNavBar.module.scss"

export default function ChatNavBar() {
  return (
    <Flex 
      as="nav" 
      px={15} 
      py={7} 
      gap={15} 
      backgroundColor="$neutral2" 
      alignItems="center" 
      class={style["chat-nav-bar"]}
    >
      <Avatar />
      <NameAndDescription name="something" />
      <Spacer />
      <MoreOptionsButton />
    </Flex>
  )
}