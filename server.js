//Import Libraries
//require('dotenv').config();
let express = require('express');
let path = require('path');
let http = require('http');
let mongoose = require('mongoose');
mongoose.set('strictQuery', false);
let socketIO = require('socket.io');

let port = 4000;

//Initialise instance of express
app = express();

let server = http.createServer(app);

//Location of views
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs'); //engine used by views

//Allow server to use JSON
app.use(express.json())

//Static resources
app.use('/public', express.static(__dirname + '/views/public'));
//router
let router = require('./routes/index')
app.use('/', router);


//Connect to MongoDB - Atlas
mongoose.connect(process.env.DATABASE_URL, {
    useUnifiedTopology: true,
    useNewURLParser: true
});
let db = mongoose.connection;
db.on('error', (err) => console.log(err)); //Log problem connecting to db
db.once('open', () => console.log('Connected to database')); //Log that connection is successful

//Run socket server
let io = socketIO(server);
(server, {
  cors: {
    origin: "http://localhost:4000",
    methods: ["GET", "POST"]
  },
});


let users = {};
let votes = {};

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

//Start app
server.listen(process.env.PORT || port, () => {
    
});