import stylex from "@stylexjs/stylex"

const style = stylex.create({
  channelInfo: {
    width: '100%',
    height: '100%',
    position: 'relative',
    backgroundColor: 'var(--hope-colors-neutral2)',
  },
  content: {
    // transition: 'all 0.25s ease-out',
    position: 'absolute',
    left: '100%',
  }
})

export default function ChannelInfo() {
  return (
    <div {...stylex.props(style.channelInfo)}>
      
    </div>
  )
}