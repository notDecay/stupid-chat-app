import stylex from "@stylexjs/stylex"
import { type ParentProps } from "solid-js"

import doggie_corgi_bg_1 from "../../../assets/images/doggie_corgi_bg_1.jpg"
import { getRandomElementFromArray } from "../../utils"

const listOfBackgrounds = [
  doggie_corgi_bg_1
]

const style = stylex.create({
  app: {
    width: "100%",
    height: "100%",
    position: 'relative'
  },
  content: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  background: {
    width: "100%",
    height: "100%",
    position: "absolute",
    backgroundPosition: "center center",
    backgroundRepeat: "no-repeat",
    backgroundImage: `url(${getRandomElementFromArray(listOfBackgrounds)})`,
    backgroundSize: "cover",
    transition: 'opacity 0.25s ease-out',
    zIndex: -1
  },
  backgroundBlur: {
    "::before": {
      content: '',
      width: "100%",
      height: "100%",
      position: "absolute",
      backgroundColor: 'var(--hope-colors-blackAlpha9)',
      backdropFilter: "blur(3.6px)",
    }
  },
  hint: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 3,
    paddingBottom: 3,
    backgroundColor: 'var(--hope-colors-background)',
    position: 'absolute',
    fontSize: 16,
    borderRadius: 7,
    marginTop: 8,
    marginLeft: 10
  },
  contentHidden: {
    visibility: 'hidden'
  }
})

export default function FormBackground(props: ParentProps) {
  return (
    <div{...stylex.props(style.app)}>
      <div {...stylex.props(style.background, style.backgroundBlur)} />
      <div {...stylex.props(style.content)}>
        {props.children}
      </div>
    </div>
  )
}