const labelStyle = (bgColor) => `background: ${bgColor}; border-radius: 4px; font-weight: bold; color:white`

/**Logging some stuff into the console BUTTTT better :)
 * 
 * @param {'log' | 'warn' | 'error' | 'trace'} type the type of log
 * @param {string} labelColor the color of the label, accept `#hex`, `rgb`, `hsl`
 * @param {string} label 
 * @param {any} content 
 * @param {any[]} stuff 
 */
function log(type, labelColor, label, content, ...stuff) {
  console[type](`%c ${label} %c ${content}`, labelStyle(labelColor), '', ...stuff)
}

const INFO_COLOR = '#35c4b6'
const ERR_COLOR = '#c44835'
const WARN_COLOR = '#a1912a'
/**### class `logdown`
 * Extending and adding some utils function to make the good old friend `console.log()` way more better hehe.
 */
class logdown {
  static success = (stuff, ...otherThings) => log('log', '#35c452', 'success', stuff, ...otherThings)
  static warn = (stuff, ...otherThings) => log('warn', WARN_COLOR, 'warn', stuff, ...otherThings)
  static info = (stuff, ...otherThings) => log('log', INFO_COLOR, 'info', stuff, ...otherThings)
  static ready = (stuff, ...otherThings) => log('log', INFO_COLOR, 'ready', stuff, ...otherThings)
  static start = (stuff, ...otherThings) => log('log', '#35c450', 'start', stuff, ...otherThings)
  static err = (stuff, ...otherThings) => log('error', ERR_COLOR, 'error', stuff, ...otherThings)
  static fatal = (stuff, ...otherThings) => log('error', ERR_COLOR, 'fatal', stuff, ...otherThings)
}

export default logdown