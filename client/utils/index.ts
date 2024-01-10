import { ApiRoutes } from "../../global/apiRoutes"

export * from "./styleToken"
export * from "./event"
export * from "./logdown"

export function mergeClassNames(listOfClassnames: (string | null | undefined)[]) {
  return listOfClassnames.filter(it => it).join(' ')
}

/**Return the origin of the api.
 * 
 * If the app is on dev mode, then this will fallback to `http://localhost:4000`
 * @returns the api origin
 */
export function getOrigin() {
  return import.meta.env.DEV ? ApiRoutes.BASE_API_HREF : location.origin
}

export function apiRoute(route?: string) {
  const apiRoute = ApiRoutes.BASE_ROUTE
  return `${getOrigin()}${apiRoute}${route ?? ''}` as const
}