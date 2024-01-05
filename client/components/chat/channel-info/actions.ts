import { event } from "@client/utils"

export const enum ChannelInfoEvent {
  Toggle
}

const channelInfoEvent = new event<{
  [ChannelInfoEvent.Toggle]: []
}>()

export function toggleShowChannelInfo() {
  channelInfoEvent.emit(ChannelInfoEvent.Toggle)
}