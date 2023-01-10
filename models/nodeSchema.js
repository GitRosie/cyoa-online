let mongoose = require('mongoose');

let optionsSchema = new mongoose.Schema({
  optText: {
    type: String,
    required: true
  },
  nextNode: {
    type: Number,
    required: true
  }
});

let nodeSchema = new mongoose.Schema({
  nodeId: {
    type: Number,
    required: true
  },
  text: {
    type: String,
    requied: true
  },
  options: [optionsSchema]
});

module.exports = mongoose.model('storyNode', nodeSchema);