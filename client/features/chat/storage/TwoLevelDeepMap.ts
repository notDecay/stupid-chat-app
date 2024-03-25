/**Stores data in a two-level structure using `Map`s for efficient retrieval and organization.
 * Useful for representing nested data relationships or key-value pairs within key-value pairs.
 * 
 * The structure looks something like this (simpified)
 * ```
 * Map {
 *   'something' => Map {
 *     'anything' => Map { ... }
 *     'morething' => Map { ... }
 *     ...
 *   }
 *   ...
 * }
 * ```
 * 
 * @template Key must be a `string` to represent the top-level keys.
 * @template Value any object but it must have an `id` property of type string to 
 * serve as the second-level key within each top-level group.
 * @class
 */
export class TwoLevelDeepMap<
  Key extends string,
  Value extends { id: string }
> {
  protected readonly storage: Map<string, Map<string, Value>> = new Map()
  /**A cache to store the last item accessed for each key. */
  protected readonly lastItemCache: Record<string, Value> = {}

  /**Constructs a new `TwoLevelDeepMap` instance.
   * Logs a message indicating a new storage is being created.
   */
  constructor() {
    this.log(`creating new storage`)
  }

  /**Retrieves the inner map associated with the provided key.
   * Returns the inner map as a `Map<string, Value>` or `undefined` if the key doesn't exist.
   * 
   * @param key The key to retrieve the inner map for.
   */
  get(key: Key): Map<string, Value> | undefined {
    return this.storage.get(key)
  }

  /**Sets a value in the inner map associated with the provided key.
   * 
   * Logs messages for retrieving the key and creating a new inner map (if necessary).
   * And then store it to the last item cache.
   * 
   * @param key The key for the inner map.
   * @param value The value to store in the inner map. The value must have an 'id' property of type string.
   * @returns *nothing*
   */
  set(key: Key, value: Value) {
    let thatStorage = this.storage.get(key)
    this.log(`get "${key}"`)
    if (!thatStorage) {
      thatStorage = new Map()
      this.storage.set(key, thatStorage)
      this.log(`|  creating new map...`)
    }
    thatStorage.set(value.id, value)
    this.log(`|  okey :)`)

    this.lastItemCache[key] = value
  }

  /**Converts the inner map associated with the provided key to an array.
   * Returns an empty array if the inner map doesn't exist.
   * 
   * @param key The key to retrieve the inner map for.
   * @returns An array of values from the inner map or an empty array.
   */
  toArray(key: Key): Value[] {
    const dataFromCache = this.storage.get(key)
    if (!dataFromCache) {
      return []
    }
    const toArray = [...dataFromCache.values()]
    return toArray as Value[]
  }

  /**Gets the last item from the inner map associated with the provided `key`.
   *
   * @param key The key for the inner map.
   * @returns The last item or `undefined` if the inner map is empty.
   */
  getLastItem(key: Key): Value | undefined {
    return this.lastItemCache[key]
  }

  /**A helper function for logging messages. Prepends a `[storage]` prefix to the logged messages.
   * 
   * @param something Any arguments to be logged.
   * @returns *nothing*
   */
  protected log(...something: any[]) {
    console.log(`[storage] `, ...something)
  }
}