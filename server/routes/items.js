var express = require('express');
var router = express.Router();
var itemController = require('../controllers/itemController');
var authorization = require('../middlewares/authorization');

router.post('/', authorization, itemController.createNewItem);

module.exports = router;