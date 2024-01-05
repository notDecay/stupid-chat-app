import { 
  Box,
  Button, 
  Modal, 
  ModalBody, 
  ModalCloseButton, 
  ModalContent, 
  type ModalContentProps, 
  ModalFooter, 
  ModalHeader, 
  ModalOverlay, 
  type ModalProps,
  ModalBodyProps
} from "@hope-ui/solid"
import type { JSX, ParentProps } from "solid-js"

import { mergeClassNames } from "../../utils"
import stylex from "@stylexjs/stylex"

interface IModal {
  isOpen: () => boolean
  onClose: () => void
}

interface IModalContentProps extends IModal, Omit<ModalProps, "opened" | "onClose" | "centered"> {
  // ...
}

interface IModalFooterProps extends Pick<IModal, "onClose"> {
  // ...
}

interface IModalLabelProps {
  name: JSX.Element
}

const style = stylex.create({
  modalOverlay: {
    backdropFilter: 'blur(2.5px)',
  },
  modalContent: {
    position: 'static'
  },
  modalLabel: {
    marginBottom: 25,
    ':last-child': {
      marginBottom: 0
    }
  },
  modalCloseButton: {
    position: 'absolute',
    borderRadius: '50%',
    border: '2px solid var(--hope-colors-neutral8)',
    width: 40,
    height: 40
  }
})

const _Modal = {
  Modal(props: ParentProps<IModalContentProps>) {
    return (
      <Modal 
        {...props} 
        centered 
        scrollBehavior="inside" 
        opened={props.isOpen()} 
        onClose={props.onClose}
      >
        <ModalOverlay {...stylex.props(style.modalOverlay)} />
        {props.children}
      </Modal>
    )
  },

  Content(props: ModalContentProps) {
    return (
      <ModalContent {...props} class={mergeClassNames(
        stylex.props(style.modalContent).className ?? '', 
        props.class
      )}>
        <ModalCloseButton {...stylex.props(style.modalCloseButton)} />
        {props.children}
      </ModalContent>
    )
  },

  Title(props: ParentProps) {
    return (
      <ModalHeader>
        {props.children}
      </ModalHeader>
    )
  },

  Body(props: ModalBodyProps) {
    return (
      <ModalBody {...props}>
        {props.children}
      </ModalBody>
    )
  },

  Label(props: ParentProps<IModalLabelProps>) {
    return (
      <div {...stylex.props(style.modalLabel)}>
        <Box fontSize="$xs" marginBottom={15}>{props.name}</Box>
        {props.children}
      </div>
    )
  },

  Footer(props: ParentProps<IModalFooterProps>) {
    return (
      <ModalFooter>
        <Button onClick={props.onClose}>Close</Button>
      </ModalFooter>
    )
  }
}

export default _Modal