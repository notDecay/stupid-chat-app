import { 
  CloseButton, 
  type CloseButtonProps,
} from "@hope-ui/solid"
import stylex from "@stylexjs/stylex"
import { mergeClassNames, styleToken } from "../utils"

const style = stylex.create({
  closeButton: {
    borderColor: 'var(--hope-colors-neutral8)',
    borderWidth: 1,
    backgroundColor: 'transparent',
    display: 'flex'
  }
})

interface ICircleCloseButtonProps extends CloseButtonProps {
  // ...
}

export function CircleCloseButton(props: ICircleCloseButtonProps) {
  return (
    <CloseButton {...props} class={mergeClassNames([
      stylex.props(
        style.closeButton,
        styleToken.circle
      ).className,
      props.class,
      props.className
    ])} boxSize={40}></CloseButton>
  )
}