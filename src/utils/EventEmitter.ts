/**### class `EventEmitter`
 * Just for managing events. Can be extended to provide event lity in other classes.
 * 
 * This is a smaller version of nodejs [`EventEmitter`](https://nodejs.org/api/events.html)
 */
export default class<TEvent extends { [eventName: string]: any[] }> {
  #listeners = {} as TEvent

  /**Adds a listener to the specified event. 
   * @example
   * ```js
   * const event = new EventEmitter()
   * 
   * event.on('some_event', () => {
   *   console.log("'some_event' called")
   * })
   * // call the event
   * event.emit('some_event')
   * // should console out "'some_event' called"
   * ```
   */
  on<TEventName extends keyof TEvent>(eventName: TEventName, fn: (...args: TEvent[TEventName]) => any) {
    this.#listeners[eventName] = this.#listeners[eventName] || []
    this.#listeners[eventName].push(fn)
    return this
  }

  /**Adds a "one-time" listener for the event named `eventName`. 
   * The next time eventName is triggered, this listener is removed and then invoked.
   * @example
   * ```js
   * const event = new EventEmitter()
   * 
   * event.once('some_event', () => {
   *   console.log("'some_event' called")
   * })
   * // call the event
   * event.emit('some_event')
   * // should console out "'some_event' called"
   * ```
   */
  once<TEventName extends keyof TEvent>(eventName: TEventName, fn: (...args: TEvent[TEventName] | []) => any) {
    this.#listeners[eventName] = this.#listeners[eventName] || [] as unknown
    const onceWrapper = () => { 
      fn();
      this.off(eventName, onceWrapper);
    }
    this.#listeners[eventName].push(onceWrapper);
    return this;
  }

  /**Removes the specified listener from the listener array for the event named `eventName`.
   * @example
   * ```js
   * const event = new EventEmitter()
   * const callback = () => {
   *   console.log('something happen!');
   * }
   * 
   * event.on('some_event', callback);
   * // ...
   * event.removeListener('some_event', callback); 
   * ```
   * @param {EventName} eventName 
   * @param {EventCallbackFn} fn 
   */
  off<TEventName extends keyof TEvent>(eventName: TEventName, fn: (...args: TEvent[TEventName]) => any) {
    let listener = this.#listeners[eventName]
    if (!listener) return this
    for(let i = listener.length; i > 0; i--) {
      if (listener[i] === fn) {
        listener.splice(i,1)
        break
      }
    }
    return this
  }

  /**Synchronously calls each of the #listeners registered for the event named `eventName`, 
   * in the order they were registered, passing the supplied arguments to each.
   * @example
   * ```js
   * const event = new EventEmitter();
   *
   * // First listener
   * event.on('some_event', firstListener() => {
   *   console.log('Helloooo! first listener');
   * });
   * // Second listener
   * event.on('some_event', secondListener(arg1, arg2) => {
   *   console.log(`event with parameters ${arg1}, ${arg2} in second listener`);
   * });
   * // Third listener
   * event.on('some_event', thirdListener(...args) => {
   *   const parameters = args.join(', ');
   *   console.log(`event with parameters ${parameters} in third listener`);
   * });
   *
   *
   * event.emit('some_event', 1, 2, 3, 4, 5);
   *
   * // Helloooo! first listener
   * // event with parameters 1, 2 in second listener
   * // event with parameters 1, 2, 3, 4, 5 in third listener
   * ```
   * @param {EventName} eventName 
   * @param {Event[EventName]} args
   */
  emit<TEventName extends keyof TEvent>(eventName: TEventName, ...args: TEvent[TEventName]) {
    let fns = this.#listeners[eventName]
    if (!fns) return false
    fns.forEach((f) => {
      f(...args)
    })

    return true
  }

  /**Returns the listener count of the specified event named `eventName`, returns
   * `0` if no listener, non-zero otherwise
   * @param {EventName} eventName 
   */
  getlistenerCount(eventName: keyof TEvent) {
    let fns = this.#listeners[eventName] || []
    return fns.length
  }

  /**Returns the listener array for the specified event.
   * Will initialise the event object and listener arrays if required.
   * Each property in the object response is an array of listener functions.
   * @param {EventName} eventName 
   */
  getRawListeners(eventName: keyof TEvent) {
    return this.#listeners[eventName]
  }
}