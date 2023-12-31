import type express from "express"
import type { QuickDB } from "quick.db"
import type { io } from "../index"

interface IApiFunctionArguments {
  server: ReturnType<typeof express>
  database?: QuickDB
}

interface ISocketFunctionArguments {
  io: typeof io
}

export type ApiFunction = (args: IApiFunctionArguments) => any
export type SocketFunction = (args: ISocketFunctionArguments) => any

export * from "./httpStatus"