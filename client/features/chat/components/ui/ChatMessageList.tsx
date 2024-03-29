import stylex from "@stylexjs/stylex"
import { For, type JSX } from "solid-js"

const style = stylex.create({
  messageList: {
    minHeight: 'var(--height)',
    maxHeight: 'var(--height)',
    overflowY: 'scroll',
    willChange: 'transform',
    marginBlock: 5,
    paddingBottom: '4.5rem'
  }
})

interface IChatMessageList<T> {
  children: (thisMessage: T) => JSX.Element
  messages: T[]
}

export function ChatMessageList<T>(props: IChatMessageList<T>) {
  return (
    <div 
      {...stylex.props(style.messageList)}
      style={{
        '--height': 'calc(100vh - 125px)'
      }}
    >
      <For each={props.messages}>
        {it => props.children && props.children(it)}
      </For>
    </div>
  )
}