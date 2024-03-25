import { Avatar } from "@hope-ui/solid"
import stylex from "@stylexjs/stylex"
import { NameAndDescription } from "~/components"
import type { IApiChannel } from "../../api"

const style = stylex.create({
  nav: {
    display: 'flex',
    alignItems: 'center',
    gap: 15,
    paddingBlock: 15,
    paddingInline: 10,
    backgroundColor: 'var(--hope-colors-neutral2)'
  }
})

interface IChatNavbarProps {
  channel?: IApiChannel
}

export function ChatNavbar(props: IChatNavbarProps) {
  return (
    <nav {...stylex.props(style.nav)}>
      <Avatar boxSize={35} />
      <NameAndDescription name={props.channel?.name} />
    </nav>
  )
}