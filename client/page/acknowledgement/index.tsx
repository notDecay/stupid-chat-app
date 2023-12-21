import { 
  For, 
  Suspense, 
  createResource 
} from "solid-js"
import { 
  AcknowledgementLibaryInfo, 
  AcknowledgementLoadingScreen, 
  AppWrapper,
  ScrollBar
} from "../../components"
import { Box, Flex, Grid, Heading } from "@hope-ui/solid"

import style from "./index.module.scss"

export interface IPackageData {
  name: string
  version: string
  link?: string
}

async function fetchPackages() {
  console.log("fetching data...")
  const packages = (await import("../../../package-lock.json")).packages
  const listOfData = Object.entries(packages)
  const newData: IPackageData[] = []
  for (const [key, data] of listOfData) {
    // empty package name will be skipped
    if (key == "") {
      continue
    }

    newData.push({
      name: key.replace("node_modules/", ""),
      version: data.version
    })
  }
  
  return newData
}

export default function AcknowledgementPage() {
  const [resources] = createResource(fetchPackages)

  return (
    <Flex as={AppWrapper} justifyContent="center">
      <Box width="70%" overflowY="auto">
        <Heading size="2xl">
          These are open source libary that used to make this app :)
        </Heading>
        <Grid templateColumns="1fr 1fr" as={ScrollBar}>
          <Suspense fallback={<AcknowledgementLoadingScreen />}>
            <For each={resources()}>
              {it => <AcknowledgementLibaryInfo {...it} />}
            </For>
          </Suspense>
        </Grid>
      </Box>
    </Flex>
  )
}