import { Anchor, Box, Center, Image } from "@hope-ui/solid"
import FullView from "../../layout/FullView"

// import duck_typing from "../../../assets/images/duck_typing.gif"
import style from "./ChatGettingStarted.module.scss"
import ChatSidebar from "../sidebar"

export default function GettingStarted() {
  return (
    <Center as={FullView} class={style["chat-getting-started"]} flexDirection="column">
      <div>
        <Box width="19rem" height="15rem" class={style.icon} />
      </div>
      <span class={style.text}>
        <div>Select a channel</div>
        <div>
          from the <Anchor onClick={ChatSidebar.flashSidebar}>left side</Anchor> to get started :)
        </div>
      </span>
    </Center>
  )
}