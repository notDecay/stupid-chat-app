import { default as SolidMarked } from 'solid-marked/component'
import type { MDXBuiltinComponents } from 'solid-marked/compiler'
// ...
import Headings from './Headings'
import Blockquote from './Blockquote'
import Link from './Link'
import Paragraph from './Paragraph'

/**This is where I defines a set of components that render markdown elements. 
 * 
 * Each property name corresponds to a markdown element type 
 * (e.g. Heading, Paragraph) and the function defines how that element should be rendered.
 * 
 * @see {@link MDXBuiltinComponents}
 */
const MarkdownComponent: MDXBuiltinComponents = {
  Root:       (props) => props.children,
  Heading:    (props) => <Headings {...props} />,
  Paragraph:  (props) => <Paragraph {...props} />,
  Link:       (props) => <Link {...props} />,
  Blockquote: (props) => <Blockquote {...props} />
}

interface IMarkdownProps {
  /**Some text for the {@link Markdown} component to render */
  children: string
}

export function Markdown(props: IMarkdownProps) {
  return (
    <SolidMarked builtins={MarkdownComponent}>
      {props.children}
    </SolidMarked>
  )
}