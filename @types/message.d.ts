interface IMessageProps {
  replyTo?: IReplyMessage
  author: IAPIUser
  content: string
  messageId: string
}

interface IReplyMessage {
  author: IAPIUser
  content: string
  messageId: string
}

interface IMessageAnchorProps {
  link: string
}

interface IMessageCache extends IMessageProps {
  renderedMessage: string
}