import { 
  Divider, 
  Grid, 
  Spacer,
  createDisclosure,
} from "@hope-ui/solid"
import { 
  AppWrapper, 
  Channel, 
  ChannelList, 
  MoreOptions, 
  SearchBox 
} from "../../components"
import { Outlet } from "@solidjs/router"
import { Component, lazy } from "solid-js"
import { BsGearFill, BsInfoCircle } from "solid-icons/bs"
import { Dynamic } from "solid-js/web"

import style from "./ChatPage.module.scss"

export default function ChatPage() {
  const channelList = [
    {
      id: "100000000",
      name: "Test"
    }
  ]

  return (
    <Grid as={AppWrapper} templateColumns="350px 1fr" class={style.app}>
      <aside>
        <Grid templateColumns="auto auto auto" gap={10}>
          <SearchBox />
          <Spacer />
          <MoreOptionsButton />
        </Grid>
        <Divider my={15} />
        <ChannelList list={channelList}>
          {channel => <Channel {...channel} />}
        </ChannelList>
      </aside>
      <main>
        <Outlet />
      </main>
    </Grid>
  )
}

function MoreOptionsButton() {
  const appInfoModal = createModal(lazy(() => import("../../components/modals/app-info")))

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