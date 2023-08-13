export function makeid(length = 5) {
  let result = ''
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let counter = 0
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
    counter += 1
  }
  return result
}

/**
 * 
 * @param {string} str 
 * @returns 
 */
export function convertNewLinesToBreakSpaces(str) {
  return str.replaceAll('\n', '<br>')
}

export function convertBreakSpacesToNewLines(str) {
  return str.replaceAll('<br>', '\n')
}

export function sleep(ms = 5) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export function getRandomNumber(bound = 5) {
  return Math.floor(Math.random() * bound)
}

/**
 * @template T
 * @param {T[]} anyArray
 * @return {T}
 */
export function getRandomElementFromArray(anyArray) {
  return anyArray[getRandomNumber(anyArray.length)]
}