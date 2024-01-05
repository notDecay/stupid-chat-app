import { Avatar, Spacer } from "@hope-ui/solid"
import { 
  NameAndDescription,
  MoreOptionsButton 
} from "@components"

import stylex from "@stylexjs/stylex"

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

export const enum ChatNavBarAction {
  MoreOption
}

interface IChatNavBarProps {
  onActionClicked: (action: ChatNavBarAction) => any
}

export default function ChatNavBar(props: IChatNavBarProps) {
  const setAction = (action: ChatNavBarAction) => {
    props.onActionClicked.call(this, action)
  }

  return (
    <nav {...stylex.props(navbarStyle.nav)}>
      <Avatar />
      <NameAndDescription name="something" />
      <Spacer />
      <MoreOptionsButton onClick={() => setAction(ChatNavBarAction.MoreOption)} />
    </nav>
  )
}