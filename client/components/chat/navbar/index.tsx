import { Avatar, Spacer } from "@hope-ui/solid"
import { NameAndDescription, MoreOptionsButton } from "../.."

import { stylex } from "@stylexjs/stylex"

const navbarStyle = stylex.create({
  nav: {
    display: "flex",
    alignItems: "center", 
    padding: "7px 15px",
    backgroundColor: "var(--hope-colors-neutral2)",
    borderBottom: "1px solid var(--hope-colors-neutral8)",
    gap: "15px"
  }
})

export default function ChatNavBar() {
  return (
    <nav {...stylex.props(navbarStyle.nav)}>
      <Avatar />
      <NameAndDescription name="something" />
      <Spacer />
      <MoreOptionsButton />
    </nav>
  )
}