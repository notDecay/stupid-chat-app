import stylex from "@stylexjs/stylex"
import { Avatar, Spacer } from "@hope-ui/solid"
import { NameAndDescription, ThreeDotButton } from "../../components"
import type { IChannel } from "../../api/channel"

const style = stylex.create({
  navbar: {
    display: 'flex',
    alignItems: 'center',
    gap: 15,
    backgroundColor: 'var(--hope-colors-neutral2)',
    paddingTop: 7,
    paddingBottom: 7,
    paddingLeft: 18,
    paddingRight: 18,
  }
})

interface IChatNavBarProps {
  channel: IChannel | null
}

export default function ChatNavBar(props: IChatNavBarProps) {
  return (
    <nav {...stylex.props(style.navbar)}>
      <Avatar />
      <NameAndDescription name={props.channel?.name ?? ''} />
      <Spacer />
      <ThreeDotButton />
    </nav>
  )
}