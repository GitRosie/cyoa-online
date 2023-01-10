let mongoose = require('mongoose');

let nodeSchema = new mongoose.Schema({
  id: Number,
  text: String,
  options: [
    {text: String, nextNode: Number}
  ]
});

//Find method here?

let Node = mongoose.model('Node', nodeSchema);

module.exports = Node;