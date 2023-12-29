import { server } from ".."
import { __ENV__ } from "../../config/app_config"

function apiRoute(version: string, stuff?: string) {
  return `${__ENV__.api}/${version}/${stuff ?? ''}` as const
}

server.get(apiRoute("v1"), (request, response) => {
  // 
})

server.get(`${__ENV__.api}/hello`, (request, response) => {
  response.status(HttpStatusCode.Okey).json()
})