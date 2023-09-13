const labelStyle = (bgColor: string) => `background: ${bgColor}; border-radius: 4px; font-weight: bold; color: white; font-weight: bold`

type LogType = 'log' | 'warn' | 'error' | 'trace'

const INFO_COLOR = '#35c4b6'
const ERR_COLOR = '#c44835'
const WARN_COLOR = '#a1912a'

interface ILogdownRegisterCustomConsoleLog {
  prefix: string
  logType: LogType
  labelColor: string
  labelName: string
}

/**### class `logdown`
 * Extending and adding some utils function to make the good old friend `console.log()` way more better.
 */
export default class logdown {
  static print(type: LogType, labelColor: string, label: string, ...stuff: any[]) {
    console[type](`%c ${label} %c`, labelStyle(labelColor), '', ...stuff)
  }

  static #custom: Record<string, ILogdownRegisterCustomConsoleLog> = {}
  static register(...consoleLogStuff: ILogdownRegisterCustomConsoleLog[]) {
    for (let i = 0; i < consoleLogStuff.length; i++) {
      const element = consoleLogStuff[i]
      this.#custom[element.prefix] = element
    }
  }

  static log(prefixName: string, ...otherThings: any[]) {
    if (!this.#custom[prefixName]) {
      return this.warn(`prefix "${prefixName}" does not exist`)
    }

    const { logType, labelColor, labelName } = this.#custom[prefixName]

    this.print(logType, labelColor, labelName, ...otherThings)
  }
  
  static success = (...otherThings: any[]) => 
    this.print('log', '#35c452', 'success', ...otherThings)
  static warn = (...otherThings: any[]) => 
    this.print('warn', WARN_COLOR, 'warn', ...otherThings)
  static info = (...otherThings: any[]) => 
    this.print('log', INFO_COLOR, 'info', ...otherThings)
  static ready = (...otherThings: any[]) => 
    this.print('log', INFO_COLOR, 'ready', ...otherThings)
  static start = (...otherThings: any[]) => 
    this.print('log', '#35c450', 'start', ...otherThings)
  static err = (...otherThings: any[]) => 
    this.print('error', ERR_COLOR, 'error', ...otherThings)
  static fatal = (...otherThings: any[]) => 
    this.print('error', ERR_COLOR, 'fatal', ...otherThings)
}