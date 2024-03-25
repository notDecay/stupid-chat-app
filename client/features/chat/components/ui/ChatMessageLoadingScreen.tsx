import { LoadingScreen, SpinningCube } from "~/components"
import stylex from "@stylexjs/stylex"

interface IChatMessageLoadingScreenProps {
  isLoading: boolean
}

export function ChatMessageLoadingScreen(props: IChatMessageLoadingScreenProps) {
  return (
    <LoadingScreen isLoading={props.isLoading}>
      <SpinningCube />
    </LoadingScreen>
  )
}