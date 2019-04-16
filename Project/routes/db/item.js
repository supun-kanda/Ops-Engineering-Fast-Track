let express = require('express'),
router = express.Router(),
itemController = require('../../controllers/item');

router
    .get('/',itemController.getAllItems)
    .post('/',itemController.insertItem)
    .delete('/',itemController.deleteItem);

module.exports = router;