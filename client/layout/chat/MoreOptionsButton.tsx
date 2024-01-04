import { type Component, lazy, createSignal, Switch, Match, Setter } from "solid-js"
import { MoreOptions } from "../../components"
import { BsGearFill, BsInfoCircle } from "solid-icons/bs"
import { createDisclosure } from "@hope-ui/solid"

export default function MoreOptionsButton() {
  // it's just lazy-loaded the modal
  const [option, setOption] = createSignal(0)
  const appInfoModal = createModal(lazy(() => import("../../components/chat/app-info-modal")), 1, setOption)
  const settingsModal = createModal(lazy(() => import("../setting")), 2, setOption)

  return (
    <>
      <MoreOptions.Menu>
        <MoreOptions.Group name="Setting">
          <MoreOptions.Item 
            name="Some settings" 
            icon={<BsGearFill />}
            onSelect={settingsModal.onOpen}
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
      <Switch>
        <Match when={option() == 1}>
          <appInfoModal.Modal />
        </Match>
        <Match when={option() == 2}>
          <settingsModal.Modal />
        </Match>
      </Switch>
    </>
  )
}

const createModal = (ModalComponent: Component, option: number, setOption: Setter<number>) => {
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