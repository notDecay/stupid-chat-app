import stylex from "@stylexjs/stylex"
import type { ParentProps } from "solid-js"
import { styleToken } from "../../../utils"

const style = stylex.create({
  message: {
    display: 'flex',
    alignItems: 'center',
    gap: 15,
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 15,
    paddingRight: 15,
    position: 'relative',
    ':hover': {
      backgroundColor: 'var(--hope-colors-blackAlpha7)',
    }
  },
  notFollowUpMessage: {
    marginTop: 15
  }
})

interface IMessageWrapperProps {
  isFollowUp?: boolean
  type: string
  messageId: string
}

export function MessageWrapper(props: ParentProps<IMessageWrapperProps>) {
  return (
    <div 
      id={props.messageId} 
      message-type={props.type} 
      {...stylex.props(
        style.message,
        !props.isFollowUp ? style.notFollowUpMessage : {},
        styleToken.fullScreen_before
      )}
    >
      {props.children}
    </div>
  )
} 