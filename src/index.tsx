/* @refresh reload */
import { render } from 'solid-js/web'
import appConfig from '../app.json' assert { type: 'json' }
import './index.scss'

// import { lazy, type Component, createSignal, onMount, Setter } from 'solid-js'
import { lazy, type Component } from 'solid-js'
import { HopeProvider, type HopeThemeConfig } from '@hope-ui/solid'

import logdown from '@utils/logdown'
import { makeRandomSmallString } from '@utils/randomizer'
import { Router } from '@solidjs/router'
// import Splash from '@screen/splash'
// import { sleep } from '@utils/utils'
// import { SplashLog } from '@screen/splash/SplashLog'

logdown.register({
  prefix: 'App',
  labelColor: '#ff7536',
  labelName: 'App',
  logType: 'log'
})

logdown.register({
  prefix: 'route',
  labelColor: '#2cd171',
  labelName: 'Route/this route',
  logType: 'log'
})

logdown.start(`Starting this app... (v1.0.0 beta-1)
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

const root = document.getElementById('app-mount')

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?',
  )
}

// document.addEventListener('keyup', (keyboardEvent) => {
//   const keyPressed = keyboardEvent.key
//   switch(keyPressed) {
//     case 'F12':
//       console.log('%cHey there %c\nThis is a very scary place, you should not touch it ₍ᐢ.  ̯.ᐢ₎%c', 'font-size: 20px', '', "font-size: 1px; padding: 125px 125px; background-size: 250px 250px; background: no-repeat url(https://i0.wp.com/i.giphy.com/media/ZVik7pBtu9dNS/giphy-downsized.gif);")
//     break
//   }
// })

sessionStorage.setItem('user', makeRandomSmallString('user-'))

const Home = lazy(() => import('@screen/home'))
const App: Component = () => {
  const config: HopeThemeConfig = {
    initialColorMode: 'dark'
  }

  // const [showHome, setShowHome] = createSignal(false)
  // let thisSpash: HTMLDivElement
  // onMount(async() => {
  //   await doSomeCompicatedStuff(setShowHome)
  //   await cleanUp(thisSpash)
  // })

  return (
    <HopeProvider config={config}>
      <Router>
        {/* <Splash ref={thisSpash!} /> */}
        {/* {showHome() && <Home />} */}
        <Home />
      </Router>
    </HopeProvider>
  )
}

// async function doSomeCompicatedStuff(setShowHome: Setter<boolean>) {
//   await sleep(1500)
//   log('log', 'Step 1: yell "hello" to /hello')
//   await sleep(200)
//   // log('err', 'Sending an hello req to /hello: Failed with status of 500')
//   // await sleep(1000)
//   // log('log', 'Step 2: ask someone to make some toast...')
//   // await sleep(1000)
//   // // await sleep(200)
//   // log('log', 'Step 3: yell to open the door')
//   setShowHome(true)
//   // await sleep(2200)
// }

// async function cleanUp(thisSpash: HTMLDivElement) {
//   // log('log', 'Step 4: done :)')
//   await sleep(2000)
//   thisSpash.classList.add('duck-loaded')
//   SplashLog.success()
//   sleep(2700).then(() => thisSpash.remove())
// }

// function log(level: 'log' | 'warn' | 'err', ...something: string[]) {
//   SplashLog[level](...something)
//   if (level == 'log') logdown.info(...something)
//   else logdown[level](...something)
// }

render(() => <App />, root!)

logdown.log('App', 'App mounted')
export * as socket from './socketStuff'
export { appConfig }
/**Make some part of the code can only be run if on certain app mode.
 * 
 * The app mode is configrued in `app.json` file.
 * @param mode the mode to run
 * @param callback if the mode is configrued in `app.json` 
 * match the `mode` parameter, this callback function will be called
 * @returns nothing
 */
export function runOnlyInMode(mode: string, callback: Function) {
  if (appConfig.APP_MODE == mode) {
    callback()
  }
}