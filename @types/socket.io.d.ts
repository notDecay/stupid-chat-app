declare const socket: ISocketio 

interface ISocketio {
  emit: (listenerName: string, ...anyValueToEmit: any[]) => void
  on: (listenerName: string, listener: (...args: any[]) => any) => void
}