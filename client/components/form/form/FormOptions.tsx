import { Link } from "@solidjs/router"
import stylex from "@stylexjs/stylex"
import type { ParentProps } from "solid-js"

const style = stylex.create({
  option: {
    fontSize: 14
  },
  moreOptions: {
    marginTop: 15,
    marginBottom: 15,
  },
  anchor: {
    ":hover": {
      textDecoration: 'underline'
    }
  }
})

namespace FormOption {
  export function MoreOptions(props: ParentProps) {
    return (
      <div {...stylex.props(style.moreOptions)}>
        {props.children}
      </div>
    )
  }

  interface IFormOption {
    href: string
  }

  export function Option(props: ParentProps<IFormOption>) {
    return (
      <Link href={props.href} {...stylex.props(style.anchor)}>
        <div {...stylex.props(style.option)}>
          {props.children}
        </div>
      </Link>
    )
  }
}

export default FormOption