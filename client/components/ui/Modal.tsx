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

import style from "./Modal.module.scss"
import { mergeClassNames } from "../../utils"

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

const _Modal = {
  Modal(props: ParentProps<IModalContentProps>) {
    return (
      <Modal {...props} centered scrollBehavior="inside" opened={props.isOpen()} onClose={props.onClose}>
        <ModalOverlay />
        {props.children}
      </Modal>
    )
  },

  Content(props: ModalContentProps) {
    return (
      <ModalContent {...props} class={mergeClassNames(style["modal-dialog"], props.class)}>
        <ModalCloseButton class={style["modal-close-button"]} backgroundColor="$neutral6" boxSize="40px" />
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
      <div class={style["modal-label"]}>
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