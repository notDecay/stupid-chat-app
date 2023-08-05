import { makeid } from "../utils/utils.js"

export default class User {
  static create() {
    // todo
  }

  static generateUserId() {
    return `user-${makeid(15)}`
  }
}