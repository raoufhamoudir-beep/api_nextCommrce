const express = require('express');
const router = express.Router();
const { getMyStores, getOneStore, registerStore, updateStore, deleteStore } = require('../controllers/storeController');

 router.get('/', getMyStores);
router.post('/register', registerStore);
router.get('/:id', getOneStore);
router.put('/:id', updateStore);
router.delete('/:id', deleteStore);



module.exports = router;