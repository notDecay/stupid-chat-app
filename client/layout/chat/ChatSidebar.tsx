import stylex from "@stylexjs/stylex"
import { CircleCloseButton } from "../../components"
import { styleToken } from "../../utils"
import { token } from "./token.stylex"
import type { ParentProps } from "solid-js"

const minWidth = '@media (max-width: 950px)'

const style = stylex.create({
  sidebar: {
    backgroundColor: 'var(--hope-colors-neutral2)',
    width: token.sidebarWidth,
    [minWidth]: {
      position: 'absolute',
      height: '100%',
      zIndex: 3
    },
    '::before': {
      content: ''
    }
  },
  sidebarPadding: {
    paddingTop: token.sidebarPaddingTopAndBottom,
    paddingBottom: token.sidebarPaddingTopAndBottom,
    paddingLeft: token.sidebarPaddingLeftAndRight,
    paddingRight: token.sidebarPaddingLeftAndRight,
  },
  openOrCloseSidebar: {
    position: 'relative',
    display: 'none',
    [minWidth]: {
      display: 'block'
    }
  },
  closeSidebarButton: {
    position: 'absolute',
    left: "100%",
    marginTop: 15,
    marginLeft: 15,
    zIndex: 15
  }
})

export default function ChatSidebar(props: ParentProps) {
  return (
    <aside {...stylex.props(
      style.sidebar,
      styleToken.fullScreen_before
    )}>
      <div {...stylex.props(style.openOrCloseSidebar)}>
        <CircleCloseButton {...stylex.props(style.closeSidebarButton)} />
      </div>
      <div {...stylex.props(
        styleToken.fullScreen,
        style.sidebarPadding
      )}>
        {props.children}
      </div>
    </aside>
  )
}