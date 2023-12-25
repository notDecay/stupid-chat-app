/* @refresh reload */
import { HopeProvider, NotificationsProvider } from '@hope-ui/solid'
import { render } from 'solid-js/web'
import { Route, Router, Routes } from '@solidjs/router'
import { lazy } from 'solid-js'

import "./global.scss"
const root = document.getElementById("duck")

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?',
  )
}
// chat sidebar
const ChatPage = lazy(() => import("./page/chat/ChatPage"))
const ChatGettingStarted = lazy(() => import('./page/chat/ChatGettingStarted'))
const ChatMessageList = lazy(() => import('./page/chat/ChatMessageList'))

const AcknowledgementPage = lazy(() => import("./page/acknowledgement"))
function AppRoutes() {
  return (
    <Routes>
      <Route path="/" component={ChatPage}>
        <Route path='/' component={ChatGettingStarted} />
        <Route path='/channel'>
          <Route path='/' component={ChatGettingStarted} />
          <Route path='/:id' component={ChatMessageList} />
        </Route>
      </Route>
      <Route path="/acknowledgement" component={AcknowledgementPage} />
    </Routes>
  )
}

function App() {
  return (
    <Router>
      <div class="transition-screen" />
      <div class="app">
        <AppRoutes />
      </div>
    </Router>
  )
}

render(() => (
  <NotificationsProvider>
    <HopeProvider config={{
      initialColorMode: "dark"
    }}>
      <App />
    </HopeProvider>
  </NotificationsProvider>
), root!)