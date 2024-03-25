/**Checks if the given object is empty. 
 * 
 * An empty object is considered to have no enumerable own properties.
 *
 * @template T The type of the object. Defaults to an empty object (`{}`).
 * @param anyObject The object to check.
 * @returns `true` if the object is empty, `false` otherwise.
 */
export function isEmptyObject<T extends object = {}>(anyObject: T) {
  return Object.keys(anyObject).length === 0
}