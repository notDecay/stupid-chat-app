/**### interface `IChatMessage`
 * Every message types will be extends this interface
 */
export interface IChatMessage {
  id: string
}

export interface IUser {
  name: string
  id: string
  // avatar: string
}

export interface IMessage extends IChatMessage {
  user: IUser
  content: string
  readonly date: Date
  replyTo?: {}
}