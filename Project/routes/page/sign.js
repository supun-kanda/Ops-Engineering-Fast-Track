let express = require('express'),
router = express.Router(),
pageController = require('../../controllers/page'),
userController = require('../../controllers/user');

router.get('/in', pageController.signinPage);
router.get('/up', pageController.signupPage);
router.get('/out', userController.clearCookie);

module.exports = router;