import {
  type ParentProps, 
  createContext, 
  useContext, 
  splitProps
} from "solid-js"

const Context = createContext()

interface IChatPageProviderProps {

}

export function ChatPageProvider(props: ParentProps<IChatPageProviderProps>) {
  const itProps = splitProps(props, ['children'])

  return (
    <Context.Provider value={itProps}>
      {props.children}
    </Context.Provider>
  )
}

export function useChatMessages() {
  const context = useContext(Context)
  if (!context) {
    throw new Error("make sure to wrap it inside <ChatPageProvider />")
  }

  return context
}