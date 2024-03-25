import { IApiChannel } from "../api"
import { createResource } from "solid-js"

export interface IChatData {
  channels: IApiChannel[]
}

export const fetchChat = createResource(async () => {
  return {
    channels: [
      { id: '1000', name: 'duck' },
      { id: '1001', name: 'another duck' },
    ] as IApiChannel[]
  } satisfies IChatData
})