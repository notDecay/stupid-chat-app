import { 
  For, 
  Suspense, 
  createResource 
} from "solid-js"
import { 
  AcknowledgementLibaryInfo, 
  AcknowledgementLoadingScreen, 
  AppWrapper
} from "../../components"

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
    <AppWrapper>
      <Suspense fallback={<AcknowledgementLoadingScreen />}>
        <For each={resources()}>
          {it => <AcknowledgementLibaryInfo {...it} />}
        </For>
      </Suspense>
    </AppWrapper>
  )
}