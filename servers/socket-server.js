const { text } = require("body-parser");

let port = 3000;
let users = {};
let votes = {};

//Run server
let io = require("socket.io")(port, {
  cors: {
    origin: "http://localhost:4000",
    methods: ["GET", "POST"]
  },
});


io.on('connection', socket => {
  //Emit message that user has joined
  socket.on('new-user', name => {
    if(name == null) {
      name = 'Guest';
    }
    users[socket.id] = name;
    socket.broadcast.emit('user-connected', users[socket.id]);
  });

  //Emit messages received
  socket.on('send-message', message => {
    socket.broadcast.emit('received-message', { message: message, name: users[socket.id] });
  });

  //Emit message that user has left
  socket.on('disconnect', () => {
    socket.broadcast.emit('user-disconnected', users[socket.id]);
    delete users[socket.id]
  });

  //Emit that a user has voted
  socket.on('vote', vote => {
    socket.broadcast.emit('user-voted', { vote: vote, name: users[socket.id] });
  });

});