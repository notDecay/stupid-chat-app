import stylex from "@stylexjs/stylex"
import { styleToken } from "../utils"
import { Box } from "@hope-ui/solid"
import type { JSX } from "solid-js"

const style = stylex.create({
  icon: {
    width: "19rem",
    height: "15rem",
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain'
  },
  text: {
    marginTop: 25,
    fontSize: 19,
    flexDirection: 'column',
    lineHeight: 'normal'
  }
})

interface IWelcomeScreenProps {
  text: JSX.Element
  iconUrl: string
}

export function WelcomeScreen(props: IWelcomeScreenProps) {
  return (
    <div {...stylex.props(
      styleToken.fullScreen,
      styleToken.flexCenter
    )}>
      <div>
        <Box {...stylex.props(style.icon)} background={`url('${props.iconUrl}')`} />
        <div {...stylex.props(
          style.text,
          styleToken.flexCenter
        )}>
          {props.text}
        </div>
      </div>
    </div>
  )
}