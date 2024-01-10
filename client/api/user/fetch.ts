import { IUser } from "."
import { HttpsMethods } from "../../../global"
import { ApiRoutes } from "../../../global/apiRoutes"
import { apiRoute } from "../../utils"

export async function get(userId: string): Promise<IUser> {
  const data = await fetch(apiRoute(ApiRoutes.user), {
    method: HttpsMethods.get,
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  })

  const json = await data.json()
  return json
}

export async function create(userId: string) {
  const data = await fetch(apiRoute(ApiRoutes.user), {
    method: HttpsMethods.post,
    mode: 'cors',
    headers: {
      "Content-Type": "application/json",
    },
    body: {
      // @ts-ignore
      // todo: check me
      something: 'something'
    }
  })
}