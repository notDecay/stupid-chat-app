import type express from "express"
import type { QuickDB } from "quick.db"
import type { io } from "../index"
import { ApiRoutes } from "../../global/apiRoutes"

interface IApiFunctionArguments {
  server: ReturnType<typeof express>
  database?: QuickDB
}

interface ISocketFunctionArguments {
  io: typeof io
}

export type ApiFunction = (args: IApiFunctionArguments) => any
export type SocketFunction = (args: ISocketFunctionArguments) => any
export type AnyApiFunctionType = ApiFunction | SocketFunction

export function apiRoute<const T extends string>(route: T) {
  return `${ApiRoutes.BASE_ROUTE}${route}` as const
}

export function isApiFunction(
  thisFunction: AnyApiFunctionType
): thisFunction is ApiFunction {
  return thisFunction.name.toLowerCase().includes('api')
}