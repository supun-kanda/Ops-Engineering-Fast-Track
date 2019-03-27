var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  const indexFIle = path.join(__dirname,"../public/index.html");
  res.sendFile(indexFIle);
});

module.exports = router;
