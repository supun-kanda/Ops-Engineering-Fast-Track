var express = require('express'),
router = express.Router(),
path = require('path');

router.get('/', (req, res) => {
    if(req.cookies.userid) res.sendFile(path.join(__dirname,"../../public/es5/html/pos.html"));
    else res.redirect('/sign/in');
}); //route should be as in '/username/'

module.exports = router;