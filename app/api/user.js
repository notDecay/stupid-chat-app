import { makeid } from "../utils/utils.js"

export default class User {
  static create() {
    // todo
  }
  /**
   * @returns {IAPIUser | null}
   */
  static getFromLocalStorage() {
    return /**@type {IAPIUser}*/JSON.parse(localStorage.getItem('user'))
  }

  /**@param {IAPIUser} user*/
  static setToLocalStorage(user) {
    return localStorage.setItem('user', JSON.stringify(user))
  }

  static generateUserId() {
    return `user-${makeid(15)}`
  }
}