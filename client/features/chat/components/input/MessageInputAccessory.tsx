import { Match, Switch, createEffect, createSignal } from "solid-js"
import type { ICachedUserMessage } from "../../api"
import type { IChatMessageUpdateData } from "../../provider"
import type { store } from "../../storage"
// ...
import { ReplyTo } from "./ReplyTo"

/**The default configuration options for the `<MessageInput />`'s accessory. */
export const DEFAULT_ACCESSORY_OPTION = {
  type: -1,
  data: null
} as DefaultMessageInputAccessory

/**Utility type representing an option for a message input accessory.
 * 
 * @template Type A numeric type uniquely identifying the accessory.
 * @template Data The data associated with the accessory, or null if no data is required.
 */
export type AccessoryOptions<
  Type extends number, 
  Data extends CouldBe<object>
> = { type: Type, data: Data }

export type DefaultMessageInputAccessory = AccessoryOptions<-1, null>

/**Type representing a message input accessory.
 * - `AccessoryOptions<1, ICachedUserMessage>`: Represents an accessory displaying 
 * replied-to (type 1 with `ICachedUserMessage`).
 * - `  DefaultMessageInputAccessory`: Default accessory with no data (type -1 with `null`).
 * 
 * @see {@link AccessoryOptions}
 * @see {@link DefaultMessageInputAccessory}
 */
export type MessageInputAccessoryOptions = 
  AccessoryOptions<1, ICachedUserMessage> |
  DefaultMessageInputAccessory

interface IMessageInputAccessoryProps {
  currentChannelStore: typeof store['currentChannel']
  accessory: MessageInputAccessoryOptions
}

export const inputAccessoryState = {
  replyTo: createSignal<
    [boolean, ICachedUserMessage | undefined]
  >([false, undefined])
}

export function MessageInputAccessory(props: IMessageInputAccessoryProps) {
  const [, setCurrentChannel] = props.currentChannelStore

  const setInputReplyTo = (replyTo: IChatMessageUpdateData["input"]["replyTo"]) => {
    setCurrentChannel(previous => {
      return {
        input: {
          ...previous.input,
          replyTo
        }
      }
    })
  }

  const [replyTo, setReplyTo] = inputAccessoryState.replyTo

  createEffect(() => {
    const accessory = props.accessory
    switch(accessory.type) {
      case 1:
        setReplyTo([true, accessory.data])
        break
    }
  })

  return (
    <Switch>
      <Match when={replyTo()[0]}>
        <ReplyTo data={props.accessory.data!} onClose={() => {
          setInputReplyTo(undefined)
          setReplyTo([false, undefined])
        }} />
      </Match>
    </Switch>
  )
}