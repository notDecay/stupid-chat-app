import { Divider, Grid, Spacer } from "@hope-ui/solid"
import SearchBox from "./SearchBox"
import Channel from "./Channel"
import MoreOptionsButton from "./MoreOptionsButton"

export default function ChatSidebar() {
  const channelList = [
    {
      id: "100000000",
      name: "Test"
    }
  ]

  return (
    <>
      <Grid templateColumns="auto auto auto" gap={10}>
        <SearchBox />
        <Spacer />
        <MoreOptionsButton />
      </Grid>
      <Divider my={15} />
      <Channel.List list={channelList}>
        {channel => <Channel.Channel {...channel} />}
      </Channel.List>
    </>
  )
}