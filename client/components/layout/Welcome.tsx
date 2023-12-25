import { Box, type CenterProps } from "@hope-ui/solid"

import { ParentProps } from "solid-js"
import stylex from "@stylexjs/stylex"

const welcomeStyles = stylex.create({
  screen: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    width: "100%",
    height: "100%"
  },
  text: {
    textAlign: "center",
    lineHeight: "normal"
  },
  icon: {
    background: "center center no-repeat",
    backgroundSize: "contain",
    width: "19rem",
    height: "15rem"
  }
})

namespace Welcome {
  export function Screen(props: CenterProps) {
    return (
      <div {...stylex.props(welcomeStyles.screen)}>
        {props.children}
      </div>
    )
  }

  interface IWelcomeIconProps {
    iconUrl?: string
  }

  export function Icon(props: IWelcomeIconProps) {
    return (
      <div>
        {/* @ts-ignore */}
        <Box {...stylex.props(welcomeStyles.icon)} backgroundImage={`url("${props.iconUrl}") !important`} />
      </div>
    )
  }

  export function Text(props: ParentProps) {
    return (
      <span {...stylex.props(welcomeStyles.text)}>
        {props.children}
      </span>
    )
  }
}

export default Welcome