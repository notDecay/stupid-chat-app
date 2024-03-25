import { For } from "solid-js"
import Channel from "./Channel"
import { IApiChannel } from "../../api"

interface IChannelListProps {
  channels: IApiChannel[]
}

export function ChannelList(props: IChannelListProps) {
  return (
    <div>
      <For each={props.channels}>
        {it => <Channel {...it} />}
      </For>
    </div>
  )
}