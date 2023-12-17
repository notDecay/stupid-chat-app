import { Divider, Grid, Spacer } from "@hope-ui/solid"
import SearchBox from "./SearchBox"
import Channel from "./Channel"
import MoreOptionsButton from "./MoreOptionsButton"
import { FullView } from "../.."
import { event } from "../../../utils"

import style from "./index.module.scss"

namespace ChatSidebar {
  const enum SidebarEvents {
    /**Fired whenever the sidebar is being flashed, via calling `flashSidebar()` function
     * @see {@link flashSidebar}
     */
    highlightShown
  } 

  const sidebarEvent = new event<{
    [SidebarEvents.highlightShown]: []
  }>()

  /**Creates the chat sidebar hold the search box and the channel list
   * @returns JSX element
   */
  export function Sidebar() {
    let sidebar: HTMLDivElement
    const channelList = [ // todo: get this somewhere
      {
        id: "100000000",
        name: "Test"
      }
    ]

    sidebarEvent.on(SidebarEvents.highlightShown, () => {
      sidebar.classList.toggle(style["highlight-shown"])
      // remove it so it can be flashed again :)
      setTimeout(() => {
        sidebar.classList.toggle(style["highlight-shown"])
      }, 0.75 * 1000)
      // ^^^^^^^^^^^ todo: somehow can sync it from the style -> here
      //             this delay in milisecond is the same as the animation delay
      //             idk what's the best way lol
      //             (other than just hard-coded it :>)
    })
  
    return (
      <FullView class={style["chat-sidebar"]} ref={sidebar!}>
        <div class={style["content"]}>
          <Grid templateColumns="auto auto auto" gap={10}>
            <SearchBox />
            <Spacer />
            <MoreOptionsButton />
          </Grid>
          <Divider my={15} />
          <Channel.List list={channelList}>
            {channel => <Channel.Channel {...channel} />}
          </Channel.List>
        </div>
      </FullView>
    )
  }

  /**It's just highlight the sidebar by flashing the orange border
   * @returns *nothing*
   */
  export function flashSidebar() {
    sidebarEvent.emit(SidebarEvents.highlightShown)
  }
}

export default ChatSidebar