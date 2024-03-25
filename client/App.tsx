import { HopeProvider } from "@hope-ui/solid"
import { Router } from "@solidjs/router"
import * as routes from './routes'
import { For } from "solid-js"

export default function App() {
  return (
    <HopeProvider config={{
      initialColorMode: 'dark'
    }}>
      <Router>
        <For each={Object.values(routes)}>
          {Route => <Route />}
        </For>
      </Router>
    </HopeProvider>
  )
}