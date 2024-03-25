import { 
  Button,
  type ButtonProps,
} from "@hope-ui/solid"
import stylex from "@stylexjs/stylex"
import { BsXLg } from "solid-icons/bs"

// override some default style in hope-ui's components 
import __style from "./CircleButton.module.css"

const style = stylex.create({
  closeButton: {
    backgroundColor: 'var(--hope-colors-neutral4)',
    display: 'flex',
    ":hover": {
      backgroundColor: 'var(--hope-colors-neutral6)',
    }
  }
})

interface ICircleButtonProps extends ButtonProps {
  buttonVariant?: 'circle' | 'square'
}

export function CircleButton(props: ICircleButtonProps) {
  const buttonVariant = (props.buttonVariant ?? 'circle') == 'circle' ? {
    borderRadius: '50%'
  } : {
    borderRadius: 8
  }

  const getClassnames = () => [
    stylex.props(style.closeButton).className,
    props.class,
    props.className,
    __style["close-button"]
  ].join(' ')

  return (
    <Button 
      {...props} 
      {...buttonVariant} 
      class={getClassnames()} 
      boxSize={props.boxSize ?? 40} 
      colorScheme="neutral" 
    >
      {props.children ? props.children : <BsXLg />}
    </Button>
  )
}