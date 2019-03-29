var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function(req, res) {
  const indexFIle = path.join(__dirname,"../public/pos.html");
  res.sendFile(indexFIle);
});

module.exports = router;
