import { SocketRoutes } from "../../config/app_config";
import { SocketFunction } from "../utils";

const messageApi: SocketFunction = ({ io }) => {
  io.on('connection', (socket) => {
    console.log('user connected')
    socket.on('disconnect', () => {
      console.log('user disconnected')
    })
  
    socket.on(SocketRoutes.messageCreate, (messageToSend, isFollowUp) => {
      console.log('message recived')
      
      io.emit(SocketRoutes.messageCreate, messageToSend, isFollowUp)
    })
  })
}

export default messageApi