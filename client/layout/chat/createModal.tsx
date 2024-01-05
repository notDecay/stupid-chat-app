import { createDisclosure } from "@hope-ui/solid"
import type { Component, Setter } from "solid-js"

export const createModal = (ModalComponent: Component, option: number, setOption: Setter<number>) => {
  const modal = createDisclosure()
  return {
    onOpen() {
      modal.onOpen()
      setOption(option)
    },
    Modal() {
      return (
        <ModalComponent
          // @ts-ignore
          isOpen={modal.isOpen} 
          // @ts-ignore
          onClose={() => {
            modal.onClose()
            setTimeout(() => {
              setOption(0)
            }, 750)
          }}
        />
      )
    }
  }
}