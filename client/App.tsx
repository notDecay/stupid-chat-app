import { HopeProvider } from '@hope-ui/solid'
import { Router, Routes } from '@solidjs/router'
// routes
import ChatRoutes from './routes/ChatRoutes'

export default function App() {
  return (
    <HopeProvider config={{ 
      initialColorMode: 'dark'
    }}>
      <Router>
        <Routes>
          <ChatRoutes />
        </Routes>
      </Router>
    </HopeProvider>
  )
}
