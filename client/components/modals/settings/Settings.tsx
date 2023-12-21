import { Box, Flex, Heading, Switch } from "@hope-ui/solid"
import type { JSX, ParentProps } from "solid-js"
import NameAndDescription from "../../layout/NameAndDescription"

namespace Settings {
  interface ISettingSectionProps {
    name: string
  }

  export function Section(props: ParentProps<ISettingSectionProps>) {
    return (
      <section>
        <Box marginBottom={5}>{props.name}</Box>
        {props.children}
      </section>
    )
  }

  export function Page(props: ParentProps) {
    return (
      <></>
    )
  }

  interface ISettingSwitchProps {
    name: JSX.Element
    description?: JSX.Element
  }

  export function SwitchSetting(props: ISettingSwitchProps) {
    return (
      <Flex gap={15} alignItems="center" fontSize={15} marginBottom={10}>
        <Switch />
        <NameAndDescription name={props.name} description={props.description} />
      </Flex>
    )
  }

  export function Title(props: ParentProps) {
    return (
      <Heading size="xl" marginBottom={10}>
        {props.children}
      </Heading>
    )
  }
}

export default Settings