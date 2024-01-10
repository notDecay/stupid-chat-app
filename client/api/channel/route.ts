import { AppRoutes } from "../../../global"

export function buildChannelRoute(channelId: string) {
  return `${AppRoutes.Channel}/${channelId}` as const
}

export function getChannelIdFromRoute(route: string) {
  return route.replace(AppRoutes.Channel + '/', '')
}