import { Input, InputGroup, InputLeftElement, Kbd } from "@hope-ui/solid"
import { 
  type Component,
  type Setter,
  createSignal
} from "solid-js"

interface IChatSearchBarProps {
  setShowChatConversations: Setter<boolean>
}

const ChatSearchBar: Component<IChatSearchBarProps> = ({ setShowChatConversations }) => {
  let input: HTMLInputElement
  const [showHint, setShowHint] = createSignal(false)

  function toggle(it: boolean) {
    setShowHint(it)
    setShowChatConversations(!it)
  }

  return (
    <div>
      <InputGroup size="sm" marginBottom={15}>
        <InputLeftElement pointerEvents="none">
          {/*  */}
        </InputLeftElement>
        <Input 
          type="text" 
          placeholder="Find something in this box" 
          onFocus={() => toggle(true)} 
          onFocusOut={() => toggle(false)} 
          ref={input!}
          onKeyUp={(keyboardEvent) => {
            if (keyboardEvent.key === 'Escape') input.blur()
          }}
        />
      </InputGroup>
      <div>
        {showHint() && <ChatSearchHint />}
      </div>
    </div>
  )
}

export default ChatSearchBar

const ChatSearchHint: Component = () => {
  return (
    <div>
      <Kbd>esc</Kbd> to escape dis box 
    </div>
  )
}