import { Server } from 'socket.io'
import { server, appConfig } from './main.js'

const io = new Server(server)

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on(appConfig.wsEndpoints.PING, (pingCallback) => pingCallback())
})