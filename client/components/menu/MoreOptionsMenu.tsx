import { 
  Divider, 
  Flex, 
  Heading, 
  Menu, 
  MenuContent, 
  MenuGroup, 
  MenuItem, 
  MenuLabel, 
  MenuTrigger, 
  Tooltip 
} from "@hope-ui/solid"
import { 
  type JSX, 
  type ParentProps 
} from "solid-js"

import style from "./MoreOptionsMenu.module.scss"
import ThreeDotButton from "../layout/ThreeDotButton"

interface IMoreOptionsGroupProps {
  name: string
}

interface IMoreOptionsItemProps {
  name: string
  icon: JSX.Element
  onSelect?: () => any
}

const MoreOptions = {
  Menu(props: ParentProps) {
    return (
      <Menu>
        <Tooltip withArrow label="Open more options menu" placement="right-end">
          <MenuTrigger as={ThreeDotButton} />
        </Tooltip>
        <MenuContent>
          <div>
            <Heading mx="$1">More options</Heading>
            <Divider my={8} />
          </div>
          {props.children}
        </MenuContent>
      </Menu>
    )
  },

  Group(props: ParentProps<IMoreOptionsGroupProps>) {
    return (
      <MenuGroup>
        <MenuLabel>{props.name}</MenuLabel>
        {props.children}
      </MenuGroup>
    )
  },
  
  Item(props: ParentProps<IMoreOptionsItemProps>) {
    return (
      <MenuItem class={style["option-item"]} onSelect={props.onSelect}>
        <Flex alignItems="center" gap={15}>
          {props.icon}
          <span class={style.name}>{props.name}</span>
        </Flex>
        {props.children}
      </MenuItem>
    )
  }
}

export default MoreOptions