var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function(req, res) {
  if(req.cookies.username){
    const indexFIle = path.join(__dirname,"../public/html/pos.html");
    res.sendFile(indexFIle);
  }else res.sendFile(path.join(__dirname,"../public/html/index.html"));
});

module.exports = router;
