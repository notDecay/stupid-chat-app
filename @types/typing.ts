type Component<TProps extends object> = (props: TProps) => Readonly<string>

type HTMLElementName = keyof HTMLElementTagNameMap
type FilePath = string

type ComponentOptions = {
  mountTo: string | Element
  elemName: HTMLElementName
  attrs?: object
  style?: FilePath
}

type ComponentCreatable<TCreateFunction extends Function = Function> = {
  create: TCreateFunction
}

type ComponentDisposable<TCreateFunction extends Function = Function> = {
  create: TCreateFunction
}

type FunctionalComponent<TProps extends Object = {}, TReturnType = unknown> = (props: TProps) => TReturnType

interface Window {
  __app__: {
    mode: 'test' | 'production'
  }
}

type Events<T> = T extends { [eventName: string]: any[] } ? T : unknown