import { Box } from "@hope-ui/solid"
import { Show, For, type JSX, lazy } from "solid-js"
import { ScrollBar } from ".."
import { type IChannel } from "../../../api/channel"

import style from "./ChannelList.module.scss"

interface IChannelListProps {
  list?: IChannel[]
  children: (channel: IChannel) => JSX.Element
}

const NoChannel = lazy(() => import("./NoChannel"))
export default function ChannelList(props: IChannelListProps) {
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