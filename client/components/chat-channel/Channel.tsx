import { Avatar, Flex } from "@hope-ui/solid"
import type { IChannel } from "../../../api/channel"
import { Link } from "@solidjs/router"
import { NameAndDescription } from ".."

import style from "./Channel.module.scss"

interface IChannelProps extends IChannel {
  // ...
}

export default function Channel(props: IChannelProps) {
  return (
    <Link href={`/channel/${props.id}`} activeClass={style.active}>
      <Flex class={style.channel} py={3}>
        <Avatar class={style["channel-icon"]} />
        <NameAndDescription name={props.name} />
      </Flex>
    </Link>
  )
}