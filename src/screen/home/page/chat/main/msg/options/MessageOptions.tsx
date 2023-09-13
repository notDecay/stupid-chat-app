
import { Box, Center, Flex } from "@hope-ui/solid"
import logdown from "@utils/logdown"
import { type Component, For } from "solid-js"
import { Dynamic } from "solid-js/web"

import { DEFAULT_OPTIONS, MAPPED_MESSAGE_OPTIONS, MessageOption } from "./mapping"

interface IMessageOptionsProps {
  options?: MessageOption[] | 'USE_DEFAULT'
}

const MessageOptions: Component<IMessageOptionsProps> = ({ options }) => {
  if (!options || options === 'USE_DEFAULT') options = DEFAULT_OPTIONS
  // logdown.info('message option:', options)

  const cached: Partial<Record<`option-${MessageOption}`, MessageOption>> = {}

  return (
    <Box class="message-options" flexGrow={1}>
      <Flex class="wrapper">
        <For each={options}>
          {(option) => {
            if (`option-${option}` in cached) {
              logdown.warn('Dupication option found:', MessageOption[option])
              return null
            }
            else cached[`option-${option}`] = option
            return <Dynamic component={MAPPED_MESSAGE_OPTIONS[option]}></Dynamic>
          }}
        </For>
      </Flex>
    </Box>
  )
}

export default MessageOptions

interface IMessageOptionButtonProps {
  icon?: Component
}

export const MessageOptionButton: Component<IMessageOptionButtonProps> = ({ icon }) => {
  return (
    <Center class="option-button" flexGrow={1}>
      <Dynamic component={icon!} />
    </Center>
  )
}