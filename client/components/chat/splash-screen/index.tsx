import { Show, createSignal } from "solid-js"
import stylex from "@stylexjs/stylex"

import mushroom from "../../../assets/images/mushroom.jpg"
import JumpingCube from "./JumpingCube"

const ANIMATION_DELAY_IN_SECOND = 1.5
const ANIMATION_TIMELINE_IN_SECOND = 0.55

const fadeInAnimation = stylex.keyframes({
  from: {
    opacity: 0
  },
  to: {
    opacity: 1
  }
})

const style = stylex.create({
  screen: {
    position: 'relative',
    width: '100%',
    height: '100%',
    backgroundColor: 'var(--hope-colors-background)',
    zIndex: 'var(--hope-zIndices-notification)',
    transition: `opacity ${ANIMATION_TIMELINE_IN_SECOND}s ease-out`,
  },
  show: {
    opacity: 1
  },
  hide: {
    opacity: 0
  },
  background: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundPosition: 'center center',
    backgroundImage: `url('${mushroom}')`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPositionY: '80%',
    "::before": {
      content: '',
      width: "100%",
      height: "100%",
      position: "absolute",
      backgroundColor: 'var(--hope-colors-blackAlpha9)',
      backdropFilter: "blur(2.6px)",
    }
  },
  screenHidden: {
    animation: `${fadeInAnimation} ${ANIMATION_TIMELINE_IN_SECOND}s ${ANIMATION_DELAY_IN_SECOND}s ease-out`,
    animationFillMode: 'forwards',
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 2000,
    backgroundColor: 'var(--hope-colors-background)'
  }
})

namespace ChatSplash {
  export const TOTAL_DELAY_IN_SECOND = ANIMATION_DELAY_IN_SECOND + ANIMATION_TIMELINE_IN_SECOND

  interface ILoadingScreenProps {
    show?: boolean
  }

  export function Screen(props: ILoadingScreenProps) {
    const [isHidingSplashScreen, setIsHidingSplashScreen] = createSignal(false)
  
    const hideSplashScreen = (isHiding: boolean) => {
      if (isHiding === false) {
        console.log('hide it')
        
        setTimeout(() => {
          setIsHidingSplashScreen(true)
        }, (ANIMATION_TIMELINE_IN_SECOND + ANIMATION_DELAY_IN_SECOND) * 1000)
      }
      else {
        console.log('show it')
        setIsHidingSplashScreen(false)
      }
  
      return null
    }
  
    return (
      <Show when={!isHidingSplashScreen()}>
        {hideSplashScreen(props.show!)}
        <div {...stylex.props(
          style.screen,
          props.show ? style.show : style.hide
        )}>
          <div {...stylex.props(style.screenHidden)} />
          <div {...stylex.props(style.background)}></div>
          <JumpingCube />
        </div>
      </Show>
    )
  }
}

export default ChatSplash