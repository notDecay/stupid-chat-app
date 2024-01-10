import { ChatSocketEvent } from "../../../global"
import { SocketFunction } from "../../utils"

const messageSocket: SocketFunction = ({ io }) => {
  io.on('connection', (socket) => {
    console.log('user connected')
    socket.on('disconnect', () => {
      console.log('user disconnected')
    })
  
    socket.on(ChatSocketEvent.messageSend, ({ type, messageData, user }) => {
      console.log('message recived')
      
      io.emit(ChatSocketEvent.messageSend, {
        type,
        message: {
          content: messageData.content,
          id: 'something',
          sentDate: new Date(),
          type,
          user,
        }
      })
    })
  })
}

export default messageSocket