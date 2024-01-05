import { Route, Router, Routes } from '@solidjs/router'
import { 
  ChatRoutes, 
  LoginRoutes 
} from './page'
import { AppRoutes } from '@config/app_config'
import { lazy } from 'solid-js'

const AcknowledgementPage = lazy(() => import("@page/acknowledgement"))

export default function App() {
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