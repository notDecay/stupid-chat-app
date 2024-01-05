import { Route } from "@solidjs/router"
import { lazy } from "solid-js"
import { AppRoutes } from "@config/app_config"

const ChatPage = lazy(() => import("./ChatPage"))
const ChatGettingStarted = lazy(() => import('./ChatGettingStarted'))
const ChatMessageList = lazy(() => import('./ChatMessageList'))

export default function ChatRoutes() {
  return (
    <Route path={AppRoutes.home} component={ChatPage}>
      <Route path='/' component={ChatGettingStarted} />
      <Route path={AppRoutes.channel}>
        <Route path='/' component={ChatGettingStarted} />
        <Route path='/:id' component={ChatMessageList} />
      </Route>
    </Route>
  )
}