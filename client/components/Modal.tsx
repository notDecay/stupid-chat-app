import { 
  Modal as _Modal, 
  ModalBody, 
  ModalCloseButton, 
  ModalContent, 
  ModalOverlay, 
  type createDisclosure 
} from "@hope-ui/solid"
import stylex from "@stylexjs/stylex"
import { ParentProps } from "solid-js"

const style = stylex.create({
  closeButton: {
    position: 'absolute',
    backgroundColor: 'var(--hope-colors-neutral5)',
  },
  content: {
    position: 'static',
    width: '80%'
  }
})

interface IModalProps {
  disclosure: ReturnType<typeof createDisclosure>
  minWidth?: string
}

export function Modal(props: ParentProps<IModalProps>) {
  return (
    <_Modal 
      onClose={props.disclosure.onClose} 
      opened={props.disclosure.isOpen()} 
      centered={true}
    >
      <ModalOverlay />
      <ModalContent minWidth={props.minWidth} {...stylex.props(style.content)}>
        <ModalBody>
          {props.children}
          <ModalCloseButton {...stylex.props(style.closeButton)} />
        </ModalBody>
      </ModalContent>
    </_Modal>
  )
}