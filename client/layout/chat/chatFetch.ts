import { Channel } from "../../api/channel"
import type { IChatPageProviderProps } from "../../provider/chat"
import { User, UserStore } from "../../api/user"
import { logdown } from "../../utils"

export default async function fetcher(): Promise<IChatPageProviderProps | null> {
  console.log('fetching the chat')
  const channelList = await Channel.fetchAll()
  let user
  try {
    throw 'Redirect to login page...'
    user = await User.get('')
  } catch (error) {
    logdown.err(error)
    
    return null
  }
  
  console.log('chat fetching job done')

  UserStore.save(user)

  return {
    channelList,
    user
  }
}