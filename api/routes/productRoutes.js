const express = require('express');
const router = express.Router();
const { createProduct, updateProduct, deleteProduct, getMyProducts, getall } = require('../controllers/productController');

router.get('/', getall);
router.get('/my/:id', getMyProducts);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;