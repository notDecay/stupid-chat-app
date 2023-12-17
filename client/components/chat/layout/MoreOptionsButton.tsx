import { type Component, lazy } from "solid-js"
import { MoreOptions } from "../.."
import { BsGearFill, BsInfoCircle } from "solid-icons/bs"
import { createDisclosure } from "@hope-ui/solid"
import { Dynamic } from "solid-js/web"

export default function MoreOptionsButton() {
  const appInfoModal = createModal(lazy(() => import("../../modals/app-info")))

  return (
    <>
      <MoreOptions.Menu>
        <MoreOptions.Group name="Setting">
          <MoreOptions.Item 
            name="Some settings" 
            icon={<BsGearFill />}
            onSelect={() => void 0}
          />
          <MoreOptions.Item 
            name="User related" 
            icon={<BsGearFill />}
            onSelect={() => void 0}
          />
        </MoreOptions.Group>
        <MoreOptions.Group name="This app">
          <MoreOptions.Item 
            name="App info" 
            icon={<BsInfoCircle />}
            onSelect={appInfoModal.onOpen}
          />
        </MoreOptions.Group>
      </MoreOptions.Menu>
      <appInfoModal.Modal />
    </>
  )
}

function createModal(modalComponent: Component) {
  const modal = createDisclosure()

  return {
    onOpen: modal.onOpen,
    Modal() {
      return (
        <Dynamic 
          component={modalComponent} 
          // @ts-ignore
          isOpen={modal.isOpen} 
          // @ts-ignore
          onClose={modal.onClose}
        />
      )
    }
  }
}