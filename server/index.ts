import express from "express"
// import { QuickDB, MySQLDriver } from "quick.db"
import { baseApi, messageApi, socketApi, userApi } from "./api"
import { Server } from "socket.io"
import { AppRoutes } from "../config/app_config"

export const app = express()
const PORT = 3000

const server = app.listen(PORT, () => {
  console.log("server is listened at port", PORT, ":)")
})

export const io = new Server(server)

app.use(express.static(__dirname + '/client'))

app.get([
  AppRoutes.home, 
  AppRoutes.login, 
  AppRoutes.register, 
  AppRoutes.acknowledgement
], (request, response) => {
  response.sendFile(__dirname + '/client/index.html')
})

async function main() {
  baseApi({ server: app })
  userApi({ server: app })
  socketApi({ io })
  messageApi({ io })
}

main()