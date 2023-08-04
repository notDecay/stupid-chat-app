/**
 * @param {`<${HTMLElementName}>`} elemName
 * @param {string} html 
 * @param {object} attrs
 * @returns 
 */
export function render(elemName, html, attrs = {}) {
  const element = u(elemName).attr(attrs).html(html)
  return {
    /**@param {string | Element} selector */
    to (selector) {
      u(selector).append(element)
    }
  }
}

export function panic(someMessage = '') {
  throw new Error(someMessage)
}

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

export function convertNewLinesToBreakSpaces(str) {
  return str.replaceAll('\n', '<br>')
}

export function convertBreakSpacesToNewLines(str) {
  return str.replaceAll('<br>', '\n')
}