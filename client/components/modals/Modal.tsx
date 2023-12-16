import { 
  Box,
  Button, 
  Modal, 
  ModalBody, 
  ModalCloseButton, 
  ModalContent, 
  ModalFooter, 
  ModalHeader, 
  ModalOverlay 
} from "@hope-ui/solid"
import type { JSX, ParentProps } from "solid-js"

import style from "./Modal.module.scss"

interface IModal {
  isOpen: () => boolean
  onClose: () => void
}

interface IModalContentProps extends IModal {
  // ...
}

interface IModalFooterProps extends Pick<IModal, "onClose"> {
  // ...
}

interface IModalLabelProps {
  name: JSX.Element
}

const _Modal = {
  Content(props: ParentProps<IModalContentProps>) {
    return (
      <Modal centered scrollBehavior="inside" opened={props.isOpen()} onClose={props.onClose}>
        <ModalOverlay />
        <ModalContent class={style["modal-dialog"]}>
          <ModalCloseButton class={style["modal-close-button"]} backgroundColor="$neutral6" boxSize="40px" />
          {props.children}
        </ModalContent>
      </Modal>
    )
  },

  Title(props: ParentProps) {
    return (
      <ModalHeader>
        {props.children}
      </ModalHeader>
    )
  },

  Body(props: ParentProps) {
    return (
      <ModalBody>
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