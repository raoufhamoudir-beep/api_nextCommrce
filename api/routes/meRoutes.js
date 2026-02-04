const express = require('express');
const { getMyInpho, updateMyInpho, updatePassword  } = require('../controllers/meController');
const router = express.Router();
 
 router.get('/', getMyInpho);
router.put('/', updateMyInpho);
router.post('/password', updatePassword);


module.exports = router;