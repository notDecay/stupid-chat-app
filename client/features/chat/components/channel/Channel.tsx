import { A } from "@solidjs/router"
import { IApiChannel } from "../../api"
// ...
import { Avatar } from "@hope-ui/solid"
import { NameAndDescription } from "../../../../components"
import stylex from "@stylexjs/stylex"
import __style from "./Channel.module.css"

const style = stylex.create({
  anchor: {
    position: 'relative',
    '::before': {
      content: '',
      position: 'absolute',
      zIndex: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'var(--hope-colors-neutral4)',
      borderRadius: 10,
      transition: 'opacity 0.25s'
    }
  },
  channel: {
    display: 'flex',
    alignItems: 'center',
    gap: 15,
    paddingBlock: 'var(--hope-space-2)',
    paddingInline: 'var(--hope-space-1)',
    position: 'relative',
    marginBottom: 10,
    borderRadius: 8,
  }
})

interface IChannelProps extends IApiChannel {
  // ...
}

export default function Channel(props: IChannelProps) {
  const getClassnames = () => [
    stylex.props(style.anchor).className,
    __style.channel 
  ].join(' ')

  return (
    <A
      href={props.id}
      data-channel-id={props.id}
      class={getClassnames()}
      activeClass={__style.active}
    >
      <div {...stylex.props(style.channel)}>
        <Avatar boxSize={35} src={props.iconUrl} />
        <NameAndDescription name={props.name} />
      </div>
    </A>
  )
}