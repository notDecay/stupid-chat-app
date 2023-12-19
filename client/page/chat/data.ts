import { type Resource, createResource } from "solid-js"
import { type RouteDataFuncArgs } from "@solidjs/router"

async function fetchChannel(): Promise<any[] | null> {
  return []
}

export interface ChatPageData {
  channelList: Resource<any[] | null>
}

export function chatPageData(data: RouteDataFuncArgs): ChatPageData {
  const [channel] = createResource(fetchChannel)

  return {
    channelList: channel
  }
}