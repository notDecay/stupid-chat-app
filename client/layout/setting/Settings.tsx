import { Box, Flex, Heading, Switch } from "@hope-ui/solid"
import type { JSX, ParentProps } from "solid-js"
import NameAndDescription from "../../components/ui/NameAndDescription"
import stylex from "@stylexjs/stylex"

const style = stylex.create({
  section: {
    marginBottom: 20
  },
  sectionName: {
    marginBottom: 5,
    fontWeight: 'bold'
  },
  switchSetting: {
    display: 'flex',
    alignItems: 'center',
    gap: 15,
    fontSize: 15,
    marginBottom: 10
  }
})

namespace Settings {
  interface ISettingSectionProps {
    name: string
  }

  export function Section(props: ParentProps<ISettingSectionProps>) {
    return (
      <section {...stylex.props(style.section)}>
        <div {...stylex.props(style.sectionName)}>{props.name}</div>
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
      <div {...stylex.props(style.switchSetting)}>
        <Switch />
        <NameAndDescription name={props.name} description={props.description} />
      </div>
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