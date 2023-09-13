import { FullView, Scrollable } from "@components/stuff/ShortHands"
import { createSignal, type Component, For, onMount, Setter } from "solid-js"
import ChatInput from "./input/ChatInput"
import { type IMessageProps, Message } from "./msg/Message"
import logdown from "@utils/logdown"
// import type { IMessage } from "./msg/ChatMessages"
import { makeUUIDv4 } from "@utils/randomizer"
import { createCacheStoreIfNeeds, type MessageCacheManager } from "./messageCache"
import { chatEvents } from "../ChatView"
// import { useChatView } from "./ChatView"

import { appConfig } from "index"
const { CHAT_ROUTE } = appConfig.appRoutes

export interface IMessageCache extends IMessageProps {
  renderedMessage: string
}

/**It turned into a function because everytime we click into
 * a conversation, the app will "swap" the last message cache into a new one.
 * @returns 
 */
let getMessageCache = (): MessageCacheManager | undefined => void logdown.info('nothing here')

const Chat: Component = () => {
  const [messages, setMessages] = createSignal<IMessageProps[]>([])

  function switchMessageCache(route: string, messageCache: MessageCacheManager) {
    getMessageCache = () => messageCache
    logdown.log('route', `sent u into "${route}" route`)
    const messagesFromCache = Array.from(messageCache)
      .flat()
      .filter(it => typeof it !== 'string') as IMessageCache[]
    setMessages(messagesFromCache)
  }

  onMount(() => {
    if (
      location.pathname.replace(CHAT_ROUTE, '') !== ''
    ) {
      const CURRENT_ROUTE = location.pathname.replace(CHAT_ROUTE, '')
      switchMessageCache(
        CURRENT_ROUTE,
        createCacheStoreIfNeeds(CURRENT_ROUTE)
      )
    }
  
    chatEvents.on('switchingChat', (route, messageCache) => {
      switchMessageCache(route, messageCache)
    })
  })  

  return (
    <FullView class="chat">
      <Scrollable scrollOn="y" class="message-wrapper">
        <For each={messages()}>
          {message => <Message {...message} />}
        </For>
      </Scrollable>
      <ChatInput onSending={(messageContent) => sendingTheMessage(messageContent, [setMessages])} />
    </FullView>
  )
}

export default Chat

async function sendingTheMessage(messageContent: string, [setMessages]: [setMessages: Setter<IMessageProps[]>]) {
  if (messageContent === '') return logdown.info('empty message sent')

  const processedMessage = await processMessage(messageContent)
  const newMessage: IMessageProps | IMessageCache = {
    content: messageContent,
    date: new Date(),
    id: makeUUIDv4(),
    isFollowUp: getLastMessageFromCache(getMessageCache()!)?.user.id == sessionStorage.getItem('user'),
    user: {
      name: 'unknown',
      id: sessionStorage.getItem('user')!
    },
    renderedMessage: processedMessage
  }

  setMessages(lastMessages => [...lastMessages, {
    ...newMessage,
    content: processedMessage
  }])

  getMessageCache()?.set(newMessage.id, newMessage)
}

function getLastMessageFromCache(messageCache: MessageCacheManager) {
  return Array.from(messageCache?.values() ?? {}).pop()
}

async function processMessage(messageContent: string) {
  return messageContent
}