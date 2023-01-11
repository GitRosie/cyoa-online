let port = 3000;
let users = {};
let votes = {};
let count = 0;

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

  //On new vote
  socket.on('vote', vote => {

    //if user hasn't already voted, log vote
    votes[vote] = vote;
    console.log(votes);

    //Emit that a user has voted
    socket.broadcast.emit('user-voted', { vote: vote, name: users[socket.id] });

    //Check if all players have voted

    //once all voted set nextID to most common in votes
    let nextId = vote;
    //clear ready for next round of voting
    votes = {};
    //Pass nextId in url
    io.emit('nextId', nextId);

  });

});