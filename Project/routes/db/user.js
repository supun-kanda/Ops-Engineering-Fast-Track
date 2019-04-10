var express = require('express'),
router = express.Router(),
userController = require('../../controllers/user');

router.post('/validate',userController.validateUser);
router.post('/insert',userController.insertUser);

module.exports = router;