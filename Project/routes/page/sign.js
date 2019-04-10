var express = require('express'),
router = express.Router(),
path = require('path');

router.get('/in',(req,res) => res.sendFile(path.join(__dirname,"../../public/es5/html/index.html")));
router.get('/up',(req,res) => res.sendFile(path.join(__dirname,"../../public/es5/html/signup.html")));

module.exports = router;