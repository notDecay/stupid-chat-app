import { Heading, HeadingProps } from "@hope-ui/solid"
import { HeadingProps as MDXHeadingProps } from "solid-marked/compiler"

export default function Headings(props: MDXHeadingProps) {
  const getHeadingSize = (): HeadingProps["size"] => ({
    6: 'xs',
    5: 'sm',
    4: 'xl',
    3: '2xl',
    2: '3xl',
    1: '4xl',
  } as const)[props.depth]

  return (
    <Heading size={getHeadingSize()}>
      {props.children}
    </Heading>
  )
}