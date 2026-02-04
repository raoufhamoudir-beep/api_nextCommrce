const express = require('express');
const { createOffer, getMyOffers } = require('../controllers/OfferController');
const router = express.Router();
 
 router.get('/', getMyOffers);
router.post('/', createOffer);


module.exports = router;