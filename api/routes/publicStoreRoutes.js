const express = require('express');
const {getStoreFromWebesite } = require('../controllers/storeController');
const router = express.Router();
 
 router.get('/:id', getStoreFromWebesite);


module.exports = router;