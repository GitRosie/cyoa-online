let express = require('express');
let http = require('http');
let path = require('path')
let mongoose = require('mongoose');
mongoose.set('strictQuery', false);
let Node = require('./models/nodeSchema').Node;
let routes = require('./routes/index')

let port = 4000;

//Initialise instance of express
app=express();

//Location of views
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs'); //engine used by views

//Static resources
app.use('/public', express.static(__dirname + '/views/public'));

app.get('/', routes);


//Connect to MongoDB - Atlas
//Username= username1
//Password = rS2xWgCUBv41Ta97
let url = "mongodb+srv://username1:rS2xWgCUBv41Ta97@cluster0.xgfz3di.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(url, {
    useUnifiedTopology: true,
    useNewURLParser:true
});

/* 
let server = http.createServer(function(req,res) {
    Node.find({}, function(err, result) {
        //error handler
        if (err) {
            console.log(err);
        }
        //convert to JSON
        res.setHeader("content-type", "text/json");
        //Return result as string
        res.end(JSON.stringify({"nodes": result}))
    }); 
});
*/

app.listen(port, () => {
    console.log("Listening on port: " + port);
});