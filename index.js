const express = require('express')
// const socketio = require('socket.io');

const app = express()

app.use(express.static(__dirname + '/app'))
app.get('/this_app', (req, res) => {
  res.sendFile('index.html', {root: __dirname + '/app' })
})

// app.get('/api')

const server = app.listen(3000, () => {
  console.log('server started')
})

const io = socketio(server)

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('message', (msg) => {
    io.emit('message', msg)
  });
});