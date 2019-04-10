var express = require('express'),
router = express.Router(),
path = require('path');

router.get('/', function(req, res) {
  if(req.cookies.username) res.sendFile(path.join(__dirname,"../public/html/pos.html"));
  else res.sendFile(path.join(__dirname,"../public/html/index.html"));
});

module.exports = router;
