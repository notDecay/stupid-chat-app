import type { 
  IPostUserOptions, 
  IUser 
} from "../../../client/api/user"
import { HttpStatusCode } from "../../../global"
import { ApiRoutes } from "../../../global/apiRoutes"
import { apiRoute, type ApiFunction } from "../../utils"

const userApi: ApiFunction = ({ server }) => {
  server.get(apiRoute(ApiRoutes.user), (request, response) => {
    response.status(HttpStatusCode.Okey).json({
      id: 'something',
      name: 'something',
    } satisfies IUser)
  })

  server.post(apiRoute(ApiRoutes.user), (request, response) => {
    const data: IPostUserOptions = request.body

    response.status(HttpStatusCode.DuckCreated).json({
      message: 'created :)',
      statusCode: HttpStatusCode.DuckCreated,
      body: {}
    })
  })
} 

export default userApi 