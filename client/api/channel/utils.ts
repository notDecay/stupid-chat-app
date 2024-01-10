import type { IChannel } from "."

export async function fetch() {
  // 
}

export const cache = new Map<string, IChannel>()
export async function fetchAll() {
  const channelList = (await import("../../data/channel.json")).default as IChannel[]
  for (const channel of channelList) {
    cache.set(channel.id, channel)
  }
  return channelList
}

export function isChannelListEmpty(channels: IChannel[] | null) {
  return channels == null
}