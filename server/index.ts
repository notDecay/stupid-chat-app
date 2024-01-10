import express from "express"
import cors from "cors"
import * as apiList from "./api"
import { Server } from "socket.io"
import { AppRoutes, ChatSocketEventMap } from "../global"
import { type AnyApiFunctionType, isApiFunction } from "./utils"

export const app = express()

const corsOptions: cors.CorsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
}

// ...
app.use(express.static(__dirname + '/client'))
app.use(cors(corsOptions))
// ...
const PORT = 4000

const server = app.listen(PORT, () => {
  console.log("server is listened at port", PORT, ":)")
})

export const io = new Server<
  ChatSocketEventMap.ClientToServer,
  ChatSocketEventMap.ServerToClient
>(server, {
  cors: corsOptions
})

app.get([
  AppRoutes.Home,
  AppRoutes.Channel,
], (request, response) => {
  response.sendFile(__dirname + '/client/index.html')
})

async function main() {
  console.log(apiList);
  
  const apiFunctionList = Object.entries<AnyApiFunctionType>(apiList)
  for (const [_doNothing, apiFunction] of apiFunctionList) {
    if (isApiFunction(apiFunction)) {
      apiFunction({ server: app })
    }
    else {
      apiFunction({ io: io })
    }
  }
}

main()