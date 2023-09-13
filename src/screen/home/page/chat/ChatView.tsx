import { PageView, Scrollable } from "@components/stuff/ShortHands"
import { 
  type Component, 
  For, 
  createResource, 
  createSignal, 
  lazy, 
  onMount,
} from "solid-js"
import ChatConversation, { type IChatConversation, getConversations } from "./sidebar/ChatConversation"
import { appConfig } from "index"
const { CHAT_ROUTE } = appConfig.appRoutes
import './ChatView.scss'
import Chat from "./main/Chat"

import EventEmitter from "@utils/EventEmitter"
import { Link, useNavigate } from "@solidjs/router"
import { type MessageCacheManager, createCacheStoreIfNeeds } from "./main/messageCache"
import logdown from "@utils/logdown"
import { Grid } from "@hope-ui/solid"
import { autoNavigater, lastRoute } from "@screen/home"
/**### property `chatEvents`
 * umm the name is obvious :)
 * 
 * #### events
 * #### `switchingChat`
 * ```
 * .on("switchingChat", (route: string, messageCache: MessageCacheManager) => any)
 * ```
 * fired whenever a user switch to a new conversation.
 * @param route the route uuid, this is used to switch the message cache
 * (then the app use it to render last messages)
 * @param messageCache the message cache store of that route
 */
export const chatEvents = new EventEmitter<{
  switchingChat: [route: string, messageCache: MessageCacheManager]
}>()

const ChatView: Component = () => {
  const navigate = useNavigate()

  onMount(() => {
    autoNavigater((routeName) => {
      navigate(routeName)
    })
  })
  
  return (
    <PageView sidebar={ChatSideBar} main={Chat} class="chat-view" />
  )
}

export default ChatView

const ChatSearchBar = lazy(() => import("./sidebar/ChatSearchBar"))
const ChatSearchResult = lazy(() => import("./sidebar/ChatSearchResult"))

const ChatSideBar: Component = () => {
  const [conversations] = createResource(getConversations)
  const [showChatConversations, setShowChatConversations] = createSignal(true)

  return (
    <Grid templateRows='auto 1fr' height='100%'>
      <ChatSearchBar setShowChatConversations={setShowChatConversations}/>
      <Scrollable scrollOn="y" class="chat-conversation-list">
        {showChatConversations() ? 
          <For each={conversations()}>
            {it => (
              <Link href={`${CHAT_ROUTE}${it.route}`} onClick={() => switchingTheChat(it.route)}>
                <ChatConversation {...it} />
              </Link>
            )}
          </For>
          : <ChatSearchResult />
        }
      </Scrollable>
    </Grid>
  )
}

/**I'm too lazy to type 
 * ```js
 * chatEvents.emit('switchingChat', route, createCacheStoreIfNeeds(route))
 * ```
 * @param route some route
 * @returns nothing
 * @see {@link chatEvents}
 */
function emittingSwitchingChat(route: string) {
  chatEvents.emit('switchingChat', route, createCacheStoreIfNeeds(route))
}

/**### Internal use only
 * Fired whenever a user wish to switch to a conversation.
 * 
 * When a user click to another conversation, it will fire `'switchingChat'` event
 * (then the app will do some super complicated stuff that I don't know how to
 * simplify it)
 * 
 * Then it will save the last navigated route to {@link sessionStorage} (in case
 * you go to other page e.g `/setting`, ..., the app will always navigate you to the last
 * chat conversation that you left)
 * @param chatConversationRoute
 * @returns nothing
 * @see {@link IChatConversation}
 */
export function switchingTheChat(chatConversationRoute: string) {
  const isTheSameLocation = location.pathname.replace(CHAT_ROUTE, '') === chatConversationRoute
  lastRoute.set(chatConversationRoute)
  if (isTheSameLocation) return logdown.info('same location')

  emittingSwitchingChat(chatConversationRoute)
}