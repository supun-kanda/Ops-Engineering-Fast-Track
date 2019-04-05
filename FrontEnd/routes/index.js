var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.redirect('/sign');
});
router.post('/print', (req,res) => {
  console.log("FE MSG: %s",req.body);
  res.end();
});
module.exports = router;
