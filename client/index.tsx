/* @refresh reload */
import { HopeProvider, NotificationsProvider } from '@hope-ui/solid'
import { render } from 'solid-js/web'
import { Route, Router, Routes } from '@solidjs/router'
import { lazy } from 'solid-js'

import "./global.scss"
import { chatPageData } from './page/chat/data'

const root = document.getElementById("duck")

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?',
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

// chat sidebar
const ChatPage = lazy(() => import("./page/chat/ChatPage"))
// chat main content
const ChatGettingStarted = lazy(() => import("./page/chat/ChatGettingStarted"))
const ChatMessageList = lazy(() => import("./page/chat/ChatMessageList"))

const AcknowledgementPage = lazy(() => import("./page/acknowledgement"))

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" component={ChatPage}>
        <Route path="/" component={ChatGettingStarted} data={chatPageData} />
        <Route path="/channel">
          <Route path="/" component={ChatGettingStarted} />
          <Route path="/:id" component={ChatMessageList} />
        </Route>
      </Route>
      <Route path="/acknowledgement" component={AcknowledgementPage} />
    </Routes>
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