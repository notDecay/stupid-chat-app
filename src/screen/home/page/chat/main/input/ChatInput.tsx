import { Box, Textarea } from "@hope-ui/solid"
import { type Component } from "solid-js"

import './ChatInput.scss'
import { FlexCenter } from "@components/stuff/ShortHands"
import PlusIcon from "@components/icon/CrossLine"

interface IChatInputProps {
  onSending: (messageContent: string) => any
}

const ChatInput: Component<IChatInputProps> = ({ onSending }) => {
  return (
    <Box class="message-input">
      <div></div>
      <FlexCenter centerOn="y" class="input-wrapper" gap={20} px={15} py={10}>
        <MoreOptions />
        <Textarea 
          resize='none' 
          rows={1} 
          placeholder="Slap your keyboard to say something" 
          lineHeight='normal'
          variant='unstyled'
          fontSize={15}
          onInput={autoResize}
          onKeyPress={(keyboardEvent) => {
            if (
              keyboardEvent.key !== 'Enter' ||
              keyboardEvent.key == 'Enter' && keyboardEvent.shiftKey
            ) return
            const input = keyboardEvent.currentTarget
            keyboardEvent.preventDefault()
            resetInput(input)
            onSending(input.value.trim())
            input.value = ''
          }}
        ></Textarea>
      </FlexCenter>
    </Box>
  )
}

export default ChatInput

const MAXINUM_TEXT_INPUT_ROWS = 20
function autoResize(event: InputEvent & {
  currentTarget: HTMLTextAreaElement
  target: HTMLTextAreaElement
}) {
  const input = event.target 
  
  if (input.scrollHeight > MAXINUM_TEXT_INPUT_ROWS * 15) {
    return 
  }

  resetInput(input)
  input.style.height = input.scrollHeight + 'px'
}

function resetInput(input: HTMLTextAreaElement) {
  input.style.height = ''
}

const MoreOptions: Component = () => {
  return (
    <Box py="$2">
      <div class="more-options">
        <PlusIcon boxSize={20} />
      </div>
    </Box>
  )
}