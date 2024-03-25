import { Input, InputGroup, InputLeftElement } from "@hope-ui/solid"
import stylex from "@stylexjs/stylex"
import MoreOptionsButton from "./MoreOptionsButton"

const style = stylex.create({
  searchBox: {
    display: 'flex',
    gap: 15,
  }
})

export function SearchBox() {
  return (
    <div {...stylex.props(style.searchBox)}>
      <InputGroup variant="filled">
        <InputLeftElement pointerEvents="none">
          {/* ... */}
        </InputLeftElement>
        <Input type="text" placeholder="Search this little box" name="search-box" />
      </InputGroup>
      <MoreOptionsButton />
    </div>
  )
}