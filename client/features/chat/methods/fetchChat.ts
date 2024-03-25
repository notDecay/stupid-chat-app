import { IApiChannel } from "../api"
import { createResource } from "solid-js"

/**Interface for chat data returned from the server */
export interface IChatData {
  channels: IApiChannel[]
}

/**Fetches chat data using the `createResource` hook from `solid-js`.
 * 
 * @returns A resource that resolves to an `IChatData` object.
 */
export const fetchChat = createResource(async () => {
  return {
    channels: [
      { id: '1000', name: 'duck' },
      { id: '1001', name: 'another duck' },
    ] as IApiChannel[]
  } satisfies IChatData
})