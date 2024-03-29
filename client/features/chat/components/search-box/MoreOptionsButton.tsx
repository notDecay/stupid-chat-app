import { 
  Badge, 
  Menu, 
  MenuContent, 
  MenuGroup, 
  MenuItem, 
  MenuLabel, 
  MenuTrigger, 
} from "@hope-ui/solid"
import { ThreeDotButton } from "~/components"
import stylex from "@stylexjs/stylex"

const style = stylex.create({
  menuGroup: {
    paddingInline: 'var(--hope-space-3)',
    paddingBlock: 'var(--hope-space-2)',
    marginInline: 'var(--hope-space-1)'
  }
})

export default function MoreOptionsButton() {
  return (
    <Menu>
      <MenuTrigger as={ThreeDotButton} />
      <MenuContent>
        <MenuGroup {...stylex.props(style.menuGroup)}>
          <div>
            App version: <Badge colorScheme="info">
              {/*  */}
            </Badge>
          </div>
          <div>
            Api version: <Badge colorScheme="info">
              {/*  */}
            </Badge>
          </div>
        </MenuGroup>
        <MenuGroup>
          <MenuLabel>Setting related stuff</MenuLabel>
          <MenuItem /*onSelect={() => setOption(1)}*/>App settings</MenuItem>
          <MenuItem>User settings</MenuItem>
        </MenuGroup>
        <MenuGroup>
          <MenuLabel>Random</MenuLabel>
          <MenuItem>Acknowledgement</MenuItem>
        </MenuGroup>
      </MenuContent>
    </Menu>
  )
}