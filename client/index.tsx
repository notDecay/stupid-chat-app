/* @refresh reload */
import { HopeProvider, NotificationsProvider } from '@hope-ui/solid'
import { render } from 'solid-js/web'
import { Route, Router, Routes } from '@solidjs/router'
import { lazy } from 'solid-js'
import "./global.scss"
import { 
  ChatRoutes, 
  LoginRoutes 
} from './page'
import inject from '@stylexjs/dev-runtime'
import { AppRoutes, __ENV__ } from '../config/app_config'
import { logdown } from './utils'

// @ts-ignore
inject({
  classNamePrefix: 'x',
  dev: true,
  test: false,
})

const root = document.getElementById("duck")

logdown.start(`[Duck engine] Starting this app... (${__ENV__.version} ${__ENV__.releaseChannel})
  .        ／＞　 フ
          | 　_　_| 
        ／\` ミ__^ノ 
       /　　　　 |
      /　 ヽ　　 ﾉ              ╱|、
     /　　 |　|　|            (˚ˎ 。7  
    ／￣|　　 |　|　|          |、˜〵          
    (￣ヽ＿_  ヽ_)__)         じしˍ,)ノ
    ＼二)
`)

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?',
  )
}

const AcknowledgementPage = lazy(() => import("./page/acknowledgement"))

function App() {
  return (
    <Router>
      <Routes>
        <ChatRoutes />
        <LoginRoutes />
        <Route path={AppRoutes.acknowledgement} component={AcknowledgementPage} />
      </Routes>
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