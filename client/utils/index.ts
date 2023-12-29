export { default as event } from "./event"
export { default as logdown } from "./logdown"
export * as marked from "../lib/marked"

/**Merging one or more class name together
 * @param first            the first class name
 * @param moreClassNames   optional, another class name or more class names
 * @returns 
 */
export function mergeClassNames(first: string): string
export function mergeClassNames(first: string, ...moreClassNames: (string | undefined)[]): string
export function mergeClassNames(first: string, ...moreClassNames: (string | undefined)[]): string {
  if (moreClassNames) {
    return `${first} ${moreClassNames.join(' ')}`.trim()
  }

  return first
}

/**It just escaping some unsafe html string, just that simple :)
 * @param unsafeHtmlString a html string you want to parse
 * @returns parsed html string
 */
export function escapeHtml(unsafeHtmlString: string) {
  return unsafeHtmlString
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

export function scrollDown(element: Element) {
  element.scrollBy(0, element.scrollHeight)
}

export function makeUUIDv4() {
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
    // @ts-ignore
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  )
}

export function getRandomNum(bound: number = 5) {
  return Math.floor(Math.random() * bound)
}

export function getRandomElementFromArray<T extends any>(anyArray: T[]): T {
  return anyArray[getRandomNum(anyArray.length)]
}