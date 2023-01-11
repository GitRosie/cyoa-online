let express = require('express');
let router = express.Router();
let storyNode = require('../models/nodeSchema')

//Get index page & first story node
router.get('/', async (req, res) => {
    try {
        let data = await storyNode.find({"nodeId": 0});
        res.render('index', {
            node: data
        });
    } catch (err) {
        //Catch error on server
        res.status(500).json({ message: err.message })
        //res.redirect('/');
    }
});

//get one node: nextNode
router.get('/:nodeId', async (req, res) => {
    try {
        let nodeId = req.params.nodeId;
        let data = await storyNode.find({"nodeId": nodeId});
        res.render('index', {
            node: data
        });
    } catch (err) {
        //Catch error on server
        res.status(500).json({ message: err.message })
        //res.redirect('/');
    }
});


//create a node
/* router.post('/', async (req, res) => {
    let node = new storyNode({
        nodeId: req.body.nodeId,
        text: req.body.text,
        options: {
            optText: req.body.optText,
            nextNode: req.body.nextNode
        }
    });
    try{
        let newNode = await node.save();
        //Success status
        res.status(201).json(newNode);
    }catch (err) {
        //Invalid data status
        res.status(400).json({message: err.message})
    }
}); */

module.exports = router;