/* @refresh reload */
import { HopeProvider } from '@hope-ui/solid'
import { render } from 'solid-js/web'
import "./global.scss"
import inject from '@stylexjs/dev-runtime'
import { __ENV__ } from '../config/app_config'
import { logdown } from './utils'
import App from './App'

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

render(() => (
  <HopeProvider config={{
    initialColorMode: "dark"
  }}>
    <App />
  </HopeProvider>
), root!)