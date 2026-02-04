const express = require('express');
const router = express.Router();
const { getMyOrders, updateOrder, deleteOrder, createOrderfromdashboard } = require('../controllers/orderController');

 router.post('/', createOrderfromdashboard);
router.get('/:id', getMyOrders);
router.delete('/:id', deleteOrder);
router.put('/:id', updateOrder);


module.exports = router;