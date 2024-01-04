import { Center } from "@hope-ui/solid"

interface ILoadingScreenProps {
  show?: boolean
}

export default function LoadingScreen(props: ILoadingScreenProps) {
  return (
    <Center>
      Fetching data...
    </Center>
  )
}