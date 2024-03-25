import { 
  type AnyCachedMessage,
  ChatEvent, 
  type ChatEventMap, 
  type IApiChannel, 
  type IChatMessageUpdateData 
} from "~/features/chat"
import { createStore } from "solid-js/store"
import { AppRoutes } from "public"
import { messageStore } from "../storage"

export const currentChannel = createStore({} as IChatMessageUpdateData)

interface IUpdateChatMessageOptions {
  channels: IApiChannel[]
  pathname: string
  chatEvent: ChatEventMap
}

export async function updateChatMessageIfNeed(options: IUpdateChatMessageOptions) {
  const { channels, pathname, chatEvent } = options

  if (!pathname.includes(AppRoutes.channel)) {
    return console.log('Update rejected')
  }

  const channelId = pathname.replace(`${AppRoutes.channel}/`, '')
  console.log(channelId)

  const channel = channels.find(it => it.id === channelId)
  if (!channel) {
    return console.warn('cannot find channel id', channelId)
  }

  console.log('current channel id:', channelId)
  
  let messages: AnyCachedMessage[] = messageStore.toArray(channelId)
  if (messages.length === 0) {
    chatEvent.emit(ChatEvent.messagePageFetching)
    await new Promise(resolve => setTimeout(resolve, 2000))
  }

  const [, setCurrentChannel] = currentChannel
  setCurrentChannel({
    channel,
    messages
  })

  chatEvent.emit(ChatEvent.messagePageUpdated, {
    channel,
    messages
  })
}