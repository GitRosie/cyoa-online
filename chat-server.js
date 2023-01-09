let port = 3000;
let users = {};

let io = require("socket.io")(port, {
    cors: {
      origin: "http://127.0.0.1:5500",
      methods: ["GET", "POST"]
    },
  });

io.on('connection', socket => {
  console.log('Connected to chat server');
  socket.on('new-user', name => {
    users[socket.id]=name;
    socket.broadcast.emit('user-connected', users[socket.id]);
  })
    socket.on('send message', message  => {
      socket.broadcast.emit('received message', { message: message, name: users[socket.id] });
  });
  socket.on('disconnect', () =>{
    socket.broadcast.emit('user-disconnected', users[socket.id]);
    delete users[socket.id]
  })
});