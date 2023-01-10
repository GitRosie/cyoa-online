let express = require('express');
let router = express.Router();

//Get all options
router.get('/', (req, res) => {
    res.render('index')
});

module.exports = router;