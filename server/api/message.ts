import { SocketFunction } from "../utils";

const messageApi: SocketFunction = ({ socketio }) => {
  socketio.on('connection', () => {
    console.log('user connected')
    socketio.on('disconnect', () => {
      console.log('user disconnected')
    })
  })
}

export default messageApi