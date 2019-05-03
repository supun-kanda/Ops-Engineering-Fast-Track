let express = require('express'),
router = express.Router(),
pageController = require('../../controllers/page');

router.get('/:username', pageController.mainPage);

module.exports = router;