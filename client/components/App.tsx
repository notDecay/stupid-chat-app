import stylex from "@stylexjs/stylex"
import { type JSX, splitProps } from "solid-js"

const style = stylex.create({
  app: {
    width: '100%',
    height: '100%',
  }
})

interface IAppProps extends JSX.HTMLAttributes<HTMLDivElement> {
  title: string
}

export function App(props: IAppProps) {
  const itsProps = splitProps(props, ['title'])
  
  const getClassnames = () => [
    stylex.props(style.app).className,
    props.class ?? '',
    // @ts-ignore
    props.className ?? '',
  ].join(' ')
  
  return (
    <div {...itsProps[1]} class={getClassnames()}>
      {/*  */}
      {props.children}
    </div>
  )
}