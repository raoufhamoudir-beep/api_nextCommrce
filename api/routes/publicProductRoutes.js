const express = require('express');
const router = express.Router();
const { incrementVisit, getMyProducts } = require('../controllers/productController');

router.get('/one/:id', incrementVisit);
router.get('/store/:id', getMyProducts);

module.exports = router;