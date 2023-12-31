import express from "express"
// import { QuickDB, MySQLDriver } from "quick.db"
import { baseApi, socketApi, userApi } from "./api"
import { Server } from "socket.io"
import { createServer } from "node:http"

export const server = express()
const PORT = 3000

// init socket.io
const __server = createServer(server)
export const socketio = new Server(__server)

server.listen(PORT, () => {
  console.log("server is listened at port", PORT, ":)")
})

async function main() {
  // TODO: find a better, simple database to use
  // const mysqlDriver = new MySQLDriver({
  //   port: PORT,
  //   connectTimeout: 10 ** 6,
  //   debug: true
  // })

  // await mysqlDriver.connect()

  // const database = new QuickDB({
  //   driver: mysqlDriver,
  // })

  baseApi({ server })
  userApi({ server })
  socketApi({ socketio })
}

main()