import { Box, Heading, Tab, TabList, TabPanel, Tabs } from "@hope-ui/solid"
import { Modal } from "../.."

import style from "./index.module.scss"
import Settings from "./Settings"
import DeveloperPage from "./page/DeverloperPage"
import AppearancePage from "./page/AppearancePage"

export default function SettingsModal(props: Pick<IModalProps, "isOpen" | "onClose">) {
  return (
    <Modal.Modal {...props} size="xl">
      <Modal.Content class={style["setting-content"]}>
        <Modal.Body display="flex" padding={0} borderRadius={15} backgroundColor="transparent">
          <Tabs 
            orientation="vertical" 
            flex={1} 
            class={style["setting-tabs"]}
          >
            <TabList px={15} py={5} height="100%" backgroundColor="$neutral2">
              <Heading size="2xl">Settings</Heading>
              <Settings.Section name="App">
                <Tab>Appearance</Tab>
              </Settings.Section>
              <Settings.Section name="Advance stuff">
                <Tab>Developer</Tab>
              </Settings.Section>
            </TabList>
            <Box class={style["content"]} backgroundColor="$background">
              <TabPanel><AppearancePage /></TabPanel>
              <TabPanel><DeveloperPage /></TabPanel>
            </Box>
          </Tabs>
        </Modal.Body>
      </Modal.Content>
    </Modal.Modal>
  )
}