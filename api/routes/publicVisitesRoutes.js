const express = require('express');
const router = express.Router();
const { createVisits, getMyvisits } = require('../controllers/visitsController');

router.post('/:id', createVisits);
router.get('/store/:id', getMyvisits);

module.exports = router;