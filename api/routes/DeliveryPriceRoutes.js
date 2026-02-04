const express = require('express');
const { getMyDeliveryPrice, updateDeliveryPrice } = require('../controllers/DeliveryPriceController');
const router = express.Router();
 
 router.get('/:id', getMyDeliveryPrice);
router.put('/:id', updateDeliveryPrice);


module.exports = router;