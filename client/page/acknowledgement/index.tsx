import { 
  For, 
  Suspense, 
  createResource 
} from 'solid-js'
import { 
  AcknowledgementLibaryInfo, 
  AcknowledgementLoadingScreen, 
} from '@components'
import { Box, Heading } from '@hope-ui/solid'
import stylex from "@stylexjs/stylex"

const style = stylex.create({
  page: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    height: '100%'
  },
  content: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    overflowY: 'scroll'
  }
})

export interface IPackageData {
  name: string
  version: string
  link?: string
}

async function fetchPackages() {
  console.log('fetching data...')
  const packages = (await import('../../../package-lock.json')).packages
  const listOfData = Object.entries(packages)
  const newData: IPackageData[] = []
  for (const [key, data] of listOfData) {
    // empty package name will be skipped
    if (key == '') {
      continue
    }

    newData.push({
      name: key.replace('node_modules/', ''),
      version: data.version
    })
  }
  
  return newData
}

export default function AcknowledgementPage() {
  const [resources] = createResource(fetchPackages)

  return (
    <div {...stylex.props(style.page)}>
      <Box width='70%' overflowY='auto'>
        <Heading size='2xl'>
          These are open source libary that used to make this app :)
        </Heading>
        <div {...stylex.props(style.content)}>
          <Suspense fallback={<AcknowledgementLoadingScreen />}>
            <For each={resources()}>
              {it => <AcknowledgementLibaryInfo {...it} />}
            </For>
          </Suspense>
        </div>
      </Box>
    </div>
  )
}