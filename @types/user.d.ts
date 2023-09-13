type UserId = `user-${string}`

interface IAPIUser {
  name: string
  iconUrl: string
  id: UserId
}