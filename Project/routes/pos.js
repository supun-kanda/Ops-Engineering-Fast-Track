var express = require('express'),
router = express.Router(),
path = require('path');

router.get('/', function(req, res) {
  if(req.cookies.userid) res.sendFile(path.join(__dirname,"../public/html/pos.html"));
  else res.redirect('/sign');
});

module.exports = router;
