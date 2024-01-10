import type { IUser } from "."

export function getUser(): IUser {
  const userData = sessionStorage.getItem(`user_data`)
  if (!userData) {
    console.error('User data does not exist')
  }
  
  return JSON.parse(userData!)
}

export function save(user: IUser) {
  sessionStorage.setItem(`user_data`, JSON.stringify(user))
}