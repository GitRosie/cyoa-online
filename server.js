//Import Libraries
require('dotenv').config();
let express = require('express');
let path = require('path')
let mongoose = require('mongoose');
mongoose.set('strictQuery', false);

//Initialise instance of express
app = express();

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

//Port to listen on
let port = 4000;
//Start server
app.listen(port, () => {
    console.log("Listening on port: " + port);
});