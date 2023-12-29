import { Anchor, Tag } from "@hope-ui/solid"
import { Modal, AppInfo } from "../.."
import { AppRoutes } from "../../../../config/app_config"

export default function AppInfoModal(props: Pick<IModalProps, "isOpen" | "onClose">) {
  return (
    <Modal.Modal {...props}>
      <Modal.Content>
        <Modal.Title>
          Some app informations
        </Modal.Title>
        <Modal.Body>
          <Modal.Label name="This app">
            <AppInfo.Content>
              <AppInfo.Version labelName="App version" version={<>
                v1.0.0 <Tag colorScheme="warning">dev-build 6</Tag>
              </>} />
              <AppInfo.Version labelName="Api version" version="v1" />
            </AppInfo.Content>
          </Modal.Label>
          <Modal.Label name="Acknowledgement">
            Visit <Anchor href={AppRoutes.acknowledgement} target="_blank" marginRight="4px">this</Anchor> 
            if you want to see all of the libaries used to make this app :)
          </Modal.Label>
        </Modal.Body>
        <Modal.Footer onClose={props.onClose}>
          {/*  */}
        </Modal.Footer>
      </Modal.Content>
    </Modal.Modal>
  )
}

