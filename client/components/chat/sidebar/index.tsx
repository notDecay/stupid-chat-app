import { Divider, Spacer } from "@hope-ui/solid"
import SearchBox from "./SearchBox"
import Channel from "./Channel"
import MoreOptionsButton from "./MoreOptionsButton"
import { event } from "../../../utils"

import stylex from "@stylexjs/stylex"
import { createSignal } from "solid-js"

const highlightAnimation = stylex.keyframes({
  from: {
    borderColor: "rgba(255, 145, 0, 0.671)"
  },

  to: {
    borderColor: "transparent"
  }
})

const chatSidebarStyle = stylex.create({
  sidebar: {
    position: "relative",
    width: "100%",
    height: "100%",
    "::before": {
      content: '',
      position: "absolute",
      width: "100%",
      height: "100%",
      border: "5px dotted transparent",
    },
  },
  searchBox: {
    display: "grid",
    gridTemplateColumns: "auto auto auto"
  },
  sidebarHighlighted: {
    "::before": {
      animation: `${highlightAnimation} 0.75s ease-out`
    }
  },
  content: {
    padding: "10px 15px"
  }
})

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
    const [highlightSidebar, setHighlightSidebar] = createSignal(false)
    let sidebar: HTMLDivElement
    const channelList = [ // todo: get this somewhere
      {
        id: "100000000",
        name: "Test"
      }
    ]

    sidebarEvent.on(SidebarEvents.highlightShown, () => {
      setHighlightSidebar(true)
      // remove it so it can be flashed again :)
      setTimeout(() => {
        setHighlightSidebar(false)
      }, 0.75 * 1000)
      // ^^^^^^^^^^^ todo: somehow can sync it from the style -> here
      //             this delay in milisecond is the same as the animation delay
      //             idk what's the best way lol
      //             (other than just hard-coded it :>)
    })
  
    return (
      <div 
        ref={sidebar!}
        {...stylex.props(
          chatSidebarStyle.sidebar,
          highlightSidebar() ? chatSidebarStyle.sidebarHighlighted : null
        )}
      >
        <div {...stylex.props(chatSidebarStyle.content)}>
          <div {...stylex.props(chatSidebarStyle.searchBox)}>
            <SearchBox />
            <Spacer />
            <MoreOptionsButton />
          </div>
          <Divider my={15} />
          <Channel.List list={channelList}>
            {channel => <Channel.Channel {...channel} />}
          </Channel.List>
        </div>
      </div>
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