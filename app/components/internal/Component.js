import EventEmitter from "../../utils/EventEmitter.js";
/**
 * @template {{ [eventName: string]: any[] }} Events
 * @extends {EventEmitter<Events>}
 */
export default class extends EventEmitter {
  constructor() {
    super()
  }

  render() {
    throw new Error('this method is not implemented')
  }

  create() {
    throw new Error('this method is not implemented')
  }
}