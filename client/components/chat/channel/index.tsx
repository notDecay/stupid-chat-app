import { Avatar, Center } from "@hope-ui/solid"
import type { IChannel } from "../../../api/channel"
import { Link } from "@solidjs/router"
import { NameAndDescription } from "../.."

import { For, JSX, Show } from "solid-js"
import stylex from "@stylexjs/stylex"
import "./index.scss"

const channelStyle = stylex.create({
  channel: {
    display: "flex",
    alignItems: "center",
    padding: "5px 0",
    marginRight: 10,
    gap: "15px",
    position: "relative",
    "::before": {
      content: '',
      position: "absolute",
      width: "100%",
      height: "100%",
      backgroundColor: "var(--hope-colors-neutral8)",
      opacity: 0.15,
      borderRadius: "8px",
      transition: "opacity .15s ease-out",
    },
    ":hover::before": {
      opacity: 0.25
    }
  },
  channelIcon: {
    marginLeft: 5,
    width: 35,
    height: 35
  },
  channelList: {
    height: "calc(100% - 70px)",
    //                   ^^^^ I hard-coded this value,
    //                        too lazy to figure it out :)
    overflowY: "scroll",
    '::-webkit-scrollbar': {
      backgroundColor: "var(--hope-colors-neutral3)",
      width: 11,
      borderRadius: 5
    }
  }
})

namespace Channel {
  interface IChannelProps extends IChannel {
    // ...
  }

  export function Channel(props: IChannelProps) {
    return (
      <Link 
        href={`/channel/${props.id}`} 
      >
        <div {...stylex.props(channelStyle.channel)}>
          <Avatar {...stylex.props(channelStyle.channelIcon)} />
          <NameAndDescription name={props.name} />
        </div>
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
        <div {...stylex.props(channelStyle.channelList)}>
          <For each={props?.list}>
            {props.children}
          </For>
        </div>
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