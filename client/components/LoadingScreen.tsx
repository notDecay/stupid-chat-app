import stylex from "@stylexjs/stylex"
import { ParentProps, Show, createEffect, createSignal } from "solid-js"

const fadeOutAnimation = stylex.keyframes({
  from: { opacity: 1 },
  to: { opacity: 0 }
})

const fadeInAnimation = stylex.keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 }
})

const style = stylex.create({
  screen: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    backgroundColor: 'var(--hope-colors-background)',
    animation: `${fadeInAnimation} 0.25s ease-out forwards`,
  },
  show: {
    zIndex: 500,
  },
  hide: {
    animation: `${fadeOutAnimation} 0.25s ease-out forwards`,
  },
})

export interface ILoadingScreenProps {
  isLoading: boolean
}

export function LoadingScreen(props: ParentProps<ILoadingScreenProps>) {
  const [hideLoadingScreen, setHideLoadingScreen] = createSignal(props.isLoading)
  let divRef: HTMLDivElement

  createEffect(() => {
    const isLoading = props.isLoading
    if (!isLoading) {
      setTimeout(() => {
        setHideLoadingScreen(true)
      }, 0.25 * 1000 + 500)
    }
    else {
      setHideLoadingScreen(false)
    }

    console.log(isLoading)
  })

  return (
    <Show when={!hideLoadingScreen()}>
      <div {...stylex.props(style.screen, props.isLoading ? style.show : style.hide)} ref={divRef!}>
        {props.children}
      </div>
    </Show>
  )
}