import { Route } from "@solidjs/router"
import { lazy } from "solid-js"
import { fetchChat } from "~/features/chat"
import { AppRoutes } from "public"

const ChatHomePage = lazy(() => import('./ChatHomePage'))
const ChatMessagePage = lazy(() => import('./ChatMessagePage'))
const ChatWelcomeScreen = lazy(() => import('./ChatWelcomeScreen'))

export function ChatRoutes() {
  return (
    <Route component={ChatHomePage} path={AppRoutes.channel} load={() => fetchChat}>
      <Route component={ChatWelcomeScreen} path='/' />
      <Route component={ChatMessagePage} path=':id'></Route>
    </Route>
  )
}