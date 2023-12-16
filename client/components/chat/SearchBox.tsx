import { Divider, Input, InputGroup, InputLeftElement } from "@hope-ui/solid"
import style from "./SearchBox.module.scss"

export default function SearchBox() {
  return (
    <InputGroup>
      <InputLeftElement pointerEvents="none">
        {/* ... */}
      </InputLeftElement>
      <Input type="text" placeholder="Search this little box" name="search-box" />
    </InputGroup>
  )
}