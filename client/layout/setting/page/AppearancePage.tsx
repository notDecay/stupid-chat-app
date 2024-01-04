import { Box, type ColorMode, Flex, Grid, HStack, HopeProvider, VStack, Center, useColorMode } from "@hope-ui/solid"
import Settings from "../Settings";
import { BsCheck, BsTicket } from "solid-icons/bs";

export default function AppearancePage() {
  return (
    <div>
      <Settings.Title>
        Appearance
      </Settings.Title>
      <Theme.Previewer />
      <Settings.Title>
        Custom theme
      </Settings.Title>
      <div>
        Sadly, it currently does not have a complete system
        to create custom theme 
      </div>
    </div>
  )
}

namespace Theme {
  interface IThemePreviewerProps {
    name?: string
    color?: string
  }

  export function Previewer(props: IThemePreviewerProps) {
    const { setColorMode } = useColorMode()

    const onClickHandler = (mouseEvent: MouseEvent) => {
      const target = (mouseEvent.target as HTMLDivElement)
      const themeName = target.getAttribute("aria-theme-name")
      if (!themeName) return
      switch (themeName) {
        case "dark": setColorMode("dark"); break
        case "light": setColorMode("light"); break
        case "system": setColorMode("system"); break
      }
    }

    return (
      <HStack
        spacing={15} 
        px={15} 
        py={5} 
        width="100%" 
        backgroundColor="$neutral3" 
        onClick={onClickHandler}
        borderRadius={8}
      >
        <Center aria-theme-name="dark" borderRadius="50%" boxSize={50} background="#1a1d1e">
          <BsCheck />
        </Center>
        <Center aria-theme-name="light" borderRadius="50%" boxSize={50} background="#dddddd">
          <BsCheck />
        </Center>
      </HStack>
    )
  }
}