import { 
  Divider, 
  Input, 
  InputGroup, 
  InputLeftElement 
} from "@hope-ui/solid"
import stylex from "@stylexjs/stylex"
import { ThreeDotButton } from "../../components"
import { token } from "./token.stylex"
import type { ParentProps } from "solid-js"

const style = stylex.create({
  searchBox: {
    display: 'flex',
    gap: 15,
  },
  channelList: {
    width: '100%',
    minHeight: `calc(100% - ${token.sidebarPaddingTopAndBottom} - 60px)`,
    overflowY: 'scroll',
  }
})

export default function ChatSidebarContent(props: ParentProps) {
  return (
    <>
      <div {...stylex.props(style.searchBox)}>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            {/* ... */}
          </InputLeftElement>
          <Input type="text" placeholder="Search this little box" name="search-box" />
        </InputGroup>
        <ThreeDotButton />
      </div>
      <Divider my={15} />
      <div {...stylex.props(style.channelList)}>
        {props.children}
      </div>
    </>
  )
}