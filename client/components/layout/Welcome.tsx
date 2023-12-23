import { type CenterProps } from "@hope-ui/solid"

import style from "./Welcome.module.scss"
import { ParentProps } from "solid-js"
import { Styles } from "../../utils"
import stylex from "@stylexjs/stylex"

const welcomeStyles = stylex.create({
  screen: {
    flexDirection: "column"
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
      <div {...stylex.props(
        Styles.flexCenter, 
        Styles.fullView, 
        welcomeStyles.screen
      )}>
        {props.children}
      </div>
    )
  }

  interface IWelcomeIconProps {
    iconUrl?: string
  }

  export function Icon(props: IWelcomeIconProps) {
    const icon = stylex.create({
      icon: {
        backgroundImage: `url("${props.iconUrl}") !important`
      }
    }).icon

    return (
      <div>
        <div {...stylex.props(welcomeStyles.icon, icon)} />
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