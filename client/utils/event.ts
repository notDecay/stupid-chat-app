/**### class `event`
 * Just for managing events. Can be extended to provide event lity in other classes.
 * 
 * This is a smaller version of nodejs's [`EventEmitter`](https://nodejs.org/api/events.html)
 * 
 * It allows you to:
 * - **Subscribe** to events using the `on` method.
 * - **Listen for events only once** using the `once` method.
 * - **Unsubscribe** from events using the `off` method.
 * - **Emit** events and trigger subscribed listeners using the `emit` method.
 * - **Get the number of listeners** for a specific event using the `getListenerCount` method.
 * - **Access the raw listeners** for an event (for advanced usage) using the `getRawListeners` method.
 */
export class EventEmitter<TEvent extends { [eventName: string]: AnyFunction }> {
  #listeners = {} as Record<keyof TEvent, any[]>

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
  on<TEventName extends keyof TEvent>(eventName: TEventName, fn: TEvent[TEventName]) {
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
  once<TEventName extends keyof TEvent>(eventName: TEventName, fn: TEvent[TEventName]) {
    this.#listeners[eventName] = this.#listeners[eventName] || []
    const onceWrapper = () => { 
      fn()
      this.off(eventName, onceWrapper as TEvent[TEventName])
    }
    this.#listeners[eventName].push(onceWrapper)
    return this
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
   * event.off('some_event', callback); 
   * ```
   * @param eventName 
   * @param fn 
   */
  off<TEventName extends keyof TEvent>(eventName: TEventName, fn: TEvent[TEventName]) {
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

  /**Synchronously calls each of the listeners registered for the event named `eventName`, 
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
   * @param eventName 
   * @param {Event[EventName]} args
   */
  emit<TEventName extends keyof TEvent>(eventName: TEventName, ...args: Parameters<TEvent[TEventName]>) {
    let listeners = this.#listeners[eventName]
    if (!listeners) return false
    for (const listener of listeners) {
      listener(...args)
    }

    return true
  }

  /**Returns the listener count of the specified event named `eventName`, returns
   * `0` if no listener, non-zero otherwise
   * @param eventName 
   */
  getlistenerCount(eventName: keyof TEvent) {
    let fns = this.#listeners[eventName] || []
    return fns.length
  }

  /**Returns the listener array for the specified event.
   * Will initialise the event object and listener arrays if required.
   * Each property in the object response is an array of listener functions.
   * @param eventName 
   */
  getRawListeners(eventName: keyof TEvent) {
    return this.#listeners[eventName]
  }
}