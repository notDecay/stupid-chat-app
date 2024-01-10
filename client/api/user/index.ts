export interface IUser {
  name: string
  id: string
  iconUrl?: string
}

export * as UserStore from "./cache"
export * as User from "./fetch"