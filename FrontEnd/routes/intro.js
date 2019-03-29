var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function(req, res) {
  const introFIle = path.join(__dirname,"../public/index.html");
  res.sendFile(introFIle);
});

module.exports = router;
