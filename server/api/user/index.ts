import type { IUser } from "../../../client/api/user"
import { ApiRoutes } from "../../../global/apiRoutes"
import { apiRoute, type ApiFunction } from "../../utils"

const userApi: ApiFunction = ({ server }) => {
  server.get(apiRoute(ApiRoutes.user), (request, response) => {
    response.status(200).json({
      id: 'something',
      name: 'something',
    } satisfies IUser)
  })
} 

export default userApi 