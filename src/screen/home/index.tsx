import { FullView } from "@components/stuff/ShortHands"
import { Avatar, Box, Center, Flex } from "@hope-ui/solid"
import { type Component, lazy, ParentComponent } from "solid-js"

import './Home.scss'
import { Link, Route, Routes } from "@solidjs/router"
import { appConfig } from "index"
import logdown from "@utils/logdown"
// import { switchingTheChat } from "./page/chat/ChatView"
const ChatView = lazy(() => import("./page/chat/ChatView"))
const UserInfoView = lazy(() => import("./page/@me/UserInfoView"))

const { CHAT_ROUTE, CHAT_SUB_ROUTE, USER_INFO_ROUTE, HOME_ROUTE } = appConfig.appRoutes
const Home: Component = () => {
  return (
    <FullView class="app">
      <div class="app-inside">
        <QuickActions />
        <main>
          <Box class="app-content"></Box>
          <FullView class="app-content">
            <Routes>
              <Route path={USER_INFO_ROUTE} component={UserInfoView} />
              <Route path={[CHAT_ROUTE, CHAT_SUB_ROUTE, HOME_ROUTE]} component={ChatView} />
            </Routes>
          </FullView>
        </main>
      </div>
    </FullView>
  )
}

export default Home

import chatImage from '@assets/chat.png'

const QuickActions: Component = () => {
  return (
    <aside>
      <QuickActionBar>
        <QuickActionList href={USER_INFO_ROUTE}>
          <Avatar name="Duck" src='https://cdn.discordapp.com/attachments/1086606308809125899/1141683974385709166/image.png' boxSize={38}></Avatar>
        </QuickActionList>
        {/* todo
            - auto navigate to the last page

            uhh I can't find a way...
        */}
        <QuickActionList href={HOME_ROUTE} onClick={() => autoNavigater((routeName) => {
          console.log(routeName);
          
          // switchingTheChat(routeName)
        })}>
          <Box class="chat icon" style={{
            '--icon-url': `url(${chatImage})`,
            '--icon-bound': '25px'
          }}></Box>
        </QuickActionList>
      </QuickActionBar>
      <QuickActionBar>
        {/*  */}
      </QuickActionBar>
    </aside>
  )
}

const QuickActionBar: ParentComponent = (props) => {
  return (
    <Flex class="quick-action" flexDirection='column'>
      {props.children}
    </Flex>
  )
}

interface IQuickActionListProps {
  href: string
  onClick?: () => void
}

const QuickActionList: ParentComponent<IQuickActionListProps> = (props) => {
  return (
    <Link href={props.href} onClick={props.onClick}>
      <Flex class="quick-action-item">
        <Center flexGrow={1} {...props}>
          {props.children}
        </Center>
      </Flex>
    </Link>
  )
}

/**Store the previous chat route in case
 * you go to other page e.g `/setting`, ..., the app will always navigate you to the last
 * chat conversation that you left
 * 
 * Kinda lazy to type
 * ```js
 * sessionStorage.setItem()
 * ```
 * and
 * ```js
 * sessionStorage.getItem()
 * ```
 */
export const lastRoute = {
  get KEY() {
    return 'lastChatRoute' as const
  },
  /**Set the route name to {@link sessionStorage}
   * @param route some route
   * @returns nothing
   */
  set(route: string) {
    sessionStorage.setItem(this.KEY, route)
  },
  /**Get the route name from {@link sessionStorage}, `null` if it's not exist
   * @returns the last route that the user has been navigated to or `null`
   */
  get() {
    return sessionStorage.getItem(this.KEY)
  }
}

/**Default route when navigate to chat page.
 * 
 * The app will auto navigate you if you go to one of these route: `/`, `/chat`
 */
const DEFAULT_ROUTE = `${CHAT_ROUTE}/test`

/**
 * @todo somehow auto navigate the last route
 */
export function autoNavigater(onNavigate: (routeName: string) => void) {
  const isOnHomeOrChatPage = location.pathname == '/' || location.pathname == CHAT_ROUTE
  if (!isOnHomeOrChatPage) return
  onNavigate(DEFAULT_ROUTE)
  lastRoute.set(DEFAULT_ROUTE)
  logdown.info(`Auto navigate from ${location.pathname} -> ${DEFAULT_ROUTE}`)
  // switchingTheChat(lastRoute.get() || DEFAULT_ROUTE)
}