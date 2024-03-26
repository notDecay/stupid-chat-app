import { HopeProvider } from "@hope-ui/solid"
import { Router } from "@solidjs/router"
import * as routes from './routes'
import { For } from "solid-js"
import { appConfig } from "public"

console.log(`Starting this app... ${appConfig.version.app}
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