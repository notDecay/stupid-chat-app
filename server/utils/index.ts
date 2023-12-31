import type express from "express"
import type { QuickDB } from "quick.db"
import type { socketio } from "../index"

interface IApiFunctionArguments {
  server: ReturnType<typeof express>
  database?: QuickDB
}

interface ISocketFunctionArguments {
  socketio: typeof socketio
}

export type ApiFunction = (args: IApiFunctionArguments) => any
export type SocketFunction = (args: ISocketFunctionArguments) => any

export * from "./httpStatus"