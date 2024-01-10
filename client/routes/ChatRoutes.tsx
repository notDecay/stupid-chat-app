import { Route, useNavigate } from "@solidjs/router"
import { AppRoutes } from "../../global"
import { createResource, lazy } from "solid-js"

const ChatPageIndex = lazy(() => import('../layout/chat/_ChatPageIndex'))
const ChatMessage = lazy(() => import("../layout/chat/_ChatMessage"))
const ChatGettingStarted = lazy(() => import('../layout/chat/_ChatGettingStarted'))

function chatData() {
  const navigateTo = useNavigate()
  const [chat] = createResource(async () => {
    const data = await (await import("../layout/chat/chatFetch")).default()
    if (!data) {
      return navigateTo('/login')
    }

    return data
  })

  return chat
}

export default function ChatRoutes() {
  return (
    <Route path={AppRoutes.Home} component={ChatPageIndex} data={chatData}>
      <Route path='/' component={ChatGettingStarted} />
      <Route path={AppRoutes.Channel}>
        <Route path='/' component={ChatGettingStarted} />
        <Route path='/:id' component={ChatMessage} />
      </Route>
    </Route>
  )
}