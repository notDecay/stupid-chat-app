import { Show } from "solid-js"
import { RouteSectionProps } from "@solidjs/router"
import { ChannelList, ChatProvider, SearchBox, fetchChat } from "~/features/chat"
// ...
import { Divider } from "@hope-ui/solid"
import stylex from "@stylexjs/stylex"
import { App } from "~/components"

const style = stylex.create({
  app: {
    display: 'grid',
    gridTemplateColumns: 'auto 1fr'
  },
  aside: {
    width: 330,
    paddingBlock: 10,
    paddingInline: 15,
    backgroundColor: 'var(--hope-colors-neutral2)'
  }
})

export default function ChatHomePage(props: RouteSectionProps<typeof fetchChat>) {
  const [data] = props.data!
  return (
    <App title='' {...stylex.props(style.app)}>
      {/* ... */}
      <Show when={data()}>
        <ChatProvider data={data()}>
          <aside {...stylex.props(style.aside)}>
            <SearchBox />
            <Divider my={15} />
            <ChannelList channels={data()!.channels} />
          </aside>
          {/* ... */}
          {props.children}
        </ChatProvider>
      </Show>
    </App>
  )
}