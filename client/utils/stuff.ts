export function isEmptyObject<T extends object = {}>(anyObject: T) {
  return Object.keys(anyObject).length === 0
}