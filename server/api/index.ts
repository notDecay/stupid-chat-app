import type { server as _server } from ".."
import { __ENV__ } from "../../config/app_config"
import { type ApiFunction, HttpStatusCode } from "../utils"

/**Contrust an api route
 * @param version the api version
 * @param stuff   other routes
 */
export function api(version: string, stuff?: string) {
  return `${__ENV__.api}/${version}${stuff ?? ''}` as const
}

export const baseApi: ApiFunction = ({ server }) => {
  server.get(api("v1"), (request, response) => {
    // 
  })
  
  server.get(`${__ENV__.api}/hello`, (request, response) => {
    response.status(HttpStatusCode.Okey).json({
      apiVersion: 'v1',
      message: 'Hello from duck :)'
    })
  })
}

export { default as userApi } from "./user"
export { default as socketApi } from "./socket"
export { default as messageApi } from "./message"