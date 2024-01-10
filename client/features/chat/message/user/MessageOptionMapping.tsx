import { 
  BsPencilFill, 
  BsReplyFill, 
  BsTrash 
} from "solid-icons/bs"

export const enum MessageAction {
  edit,
  delete,
  reply
}

export const MessageOptionMapping = {
  [MessageAction.edit]: () => <BsPencilFill />,
  [MessageAction.delete]: () => <BsTrash />,
  [MessageAction.reply]: () => <BsReplyFill />,
}