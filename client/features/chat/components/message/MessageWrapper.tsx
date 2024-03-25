import stylex from "@stylexjs/stylex"
import { createContext, type ParentProps } from "solid-js"
import { useContext } from "~/utils"

const style = stylex.create({
  message: {
    display: 'flex',
    alignItems: 'center',
    gap: 15,
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 15,
    paddingRight: 15,
    position: 'relative',
    ':hover': {
      backgroundColor: 'var(--hope-colors-blackAlpha7)',
    },
    ':focus': {
      outline: 'none'
    }
  },
  notFollowUpMessage: {
    marginTop: 15,
    '::before': {
      width: '100%',
      height: '100%'
    }
  }
})

interface IMessageWrapperProps {
  isFollowUp?: boolean
  type: string
  messageId: string
}

interface IMessageContext {
  messageId: string
}

const Context = createContext<IMessageContext>()

export function MessageWrapper(props: ParentProps<IMessageWrapperProps>) {
  return (
    <Context.Provider value={{
      messageId: props.messageId
    }}>
      <div 
        id={props.messageId} 
        data-message-type={props.type}
        tabIndex={1}
        {...stylex.props(
          style.message,
          !props.isFollowUp ? style.notFollowUpMessage : {},
        )}
      >
        {props.children}
      </div>
    </Context.Provider>
  )
}

export const useMessage = useContext(Context, `Make sure to wrap it inside <${MessageWrapper.name} />`)

/**Formats a provided date object according to a specific time format.
 * 
 * @param someDate a [`Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)
 * object representing the date and time to be formatted.
 * @returns a formatted string representing the date according to the specified format.
 */
export function formatDate(someDate: Date) {
  return new Intl.DateTimeFormat("default", {
    hour: 'numeric',
    dayPeriod: 'short'
  }).format(someDate)
}