import { api } from "."
import type { server as _server } from ".."
import { HttpStatusCode, type ApiFunction } from "../utils"

const userApi: ApiFunction = ({ server }) => {
  server.get(api('v1', '/user'), (request, reponse) => {
    reponse.status(HttpStatusCode.Okey).json({
      username: "duck",
      id: "something"
    })
  })

  server.post(api('v1', '/user'), (request, reponse) => {
    // 
  })
}

export default userApi