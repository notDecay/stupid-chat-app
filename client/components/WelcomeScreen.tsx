import stylex from "@stylexjs/stylex"
import { Box } from "@hope-ui/solid"
import type { JSX } from "solid-js"

const style = stylex.create({
  screen: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
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
    lineHeight: 'normal',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

interface IWelcomeScreenProps {
  text: JSX.Element
  iconUrl: string
}

export function WelcomeScreen(props: IWelcomeScreenProps) {
  return (
    <div {...stylex.props(style.screen)}>
      <div>
        <Box {...stylex.props(style.icon)} background={`url('${props.iconUrl}')`} />
        <div {...stylex.props(style.text)}>
          {props.text}
        </div>
      </div>
    </div>
  )
}