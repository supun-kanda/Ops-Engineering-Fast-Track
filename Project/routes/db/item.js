var express = require('express'),
router = express.Router(),
itemController = require('../../controllers/item');

router.get('/getall',itemController.getAllItems);
router.post('/insert',itemController.insertItem);
router.delete('/delete',itemController.deleteItem);

module.exports = router;