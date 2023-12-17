import { Avatar, Box, Center, Flex } from "@hope-ui/solid"
import type { IChannel } from "../../../api/channel"
import { Link } from "@solidjs/router"
import { NameAndDescription, ScrollBar } from ".."

import style from "./index.module.scss"
import { For, JSX, Show } from "solid-js"

namespace Channel {
  interface IChannelProps extends IChannel {
    // ...
  }

  export function Channel(props: IChannelProps) {
    return (
      <Link href={`/channel/${props.id}`} activeClass={style.active}>
        <Flex class={style.channel} py={3}>
          <Avatar class={style["channel-icon"]} />
          <NameAndDescription name={props.name} />
        </Flex>
      </Link>
    )
  }

  interface IChannelListProps {
    list?: IChannel[]
    children: (channel: IChannel) => JSX.Element
  }

  export function List(props: IChannelListProps) {
    return (
      <Show when={props?.list} fallback={<NoChannel />}>
        <Box as={ScrollBar} class={style["channel-holder"]}>
          <For each={props?.list}>
            {props.children}
          </For>
        </Box>
      </Show>
    )
  }

  function NoChannel() {
    return (
      <Center>
        Nothing inside here...
      </Center>
    )
  }
}

export default Channel