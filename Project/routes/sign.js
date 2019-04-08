var express = require('express'),
router = express.Router(),
path = require('path');

router.get('/', function(req, res) {
  const introFIle = path.join(__dirname,"../public/html/index.html");
  res.sendFile(introFIle);
});
router.get('/newUser', function(req, res) {
  const signUp = path.join(__dirname,"../public/html/signup.html");
  res.sendFile(signUp);
});

module.exports = router;
