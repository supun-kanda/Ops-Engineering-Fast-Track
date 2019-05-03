let express = require('express'),
router = express.Router(), 

signPage = require('./page/sign'),
mainPage = require('./page/main'),
itemDB = require('./db/item'),
userDB = require('./db/user');

router.use('/sign', signPage);
router.use('/main', mainPage);
router.use('/user', userDB);
router.use('/item', itemDB);

router.get('/',(req,res) => res.redirect('/sign/in')); //home directory will be redirected for sign in

module.exports = router;