import logdown from "@utils/logdown";
import { appConfig, runOnlyInMode } from "index";
import { io } from 'socket.io-client'

runOnlyInMode("prod", async() => {
  try {
    const info = await fetch(appConfig.apiEndpoints.HELLO)
    logdown.success('[HELLO] hello from duck :)', await info.json())
  } catch (error) {
    logdown.fatal('[HELLO] failed to say hello :(')
  }
})

const socket = io(window.location.href)

runOnlyInMode("prod", () => {
  setInterval(() => {
    const start = Date.now()
  
    socket.emit(appConfig.wsEndpoints.PING, () => {
      return Date.now() - start
    })
  }, 3000)
})

export default socket