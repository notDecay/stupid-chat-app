/**
 * @param {string} html 
 * @returns 
 */
export function render(html) {
  const dom = new DOMParser().parseFromString(html, 'text/html').body
  console.log('root element count:', dom.children.length);
  if (dom.children.length > 1) {
    throw new Error(`HTML tree should has 1 root element, recieved ${dom.children.length} root element`)
  }
  const rootElement = dom.children[0]
  const attr = {}
  for (let i = 0, atts = rootElement.attributes, totalAttribute = atts.length; i < totalAttribute; i++){
    // attr
    attr[atts[i].nodeName] = atts[i].nodeValue
  }

  const element = u(`<${rootElement.tagName}>`).attr(attr).html(rootElement.innerHTML)
  return {
    /**@param {string | Element} selector */
    to (selector) {
      u(selector).append(element)
    }
  }
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