import { FlexCenter } from "@components/stuff/ShortHands"
import { Avatar, Heading } from "@hope-ui/solid"
import { makeUUIDv4 } from "@utils/randomizer"
import type { Component } from "solid-js"

export interface IChatConversation {
  name: string
  description?: string
  avatarUrl?: string
  /**Where it should go. When you click on any conversation,
   * the app will redirect to this link:
   * ```
   * .../chat/<chat_uuid>
   * ```
   * 
   * where `<chat_uuid>` is the conversation UUID
   * @type {string}
   */
  route: string
}

interface IChatConversationProps extends IChatConversation {}

const ChatConversation: Component<IChatConversationProps> = (props) => {
  return (
    <FlexCenter centerOn="y" gap={15} lineHeight='normal' class="conversation">
      <Avatar name="Duck" src={props.avatarUrl} boxSize={42}></Avatar>
      <div>
        <Heading>{props.name}</Heading>
        <div>{props.description}</div>
      </div>
    </FlexCenter>
  )
}

export default ChatConversation

const randomConversationIdThatComeFromADataBase = makeUUIDv4()

import sugerCube from '@assets/suger_cube.png'
export async function getConversations(): Promise<IChatConversation[]> {
  return [
    {
      name: 'Test',
      description: 'test',
      avatarUrl: sugerCube,
      route: '/test'
    },
    {
      name: 'something',
      description: 'test',
      avatarUrl: sugerCube,
      route: '/' + randomConversationIdThatComeFromADataBase
    }
  ]
}