const express = require('express');
const router = express.Router();
const { registerUser, loginUser, logoutUser, CheckPhoneAndEmail  } = require('../controllers/authController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.post('/checkPhonEmail', CheckPhoneAndEmail);

module.exports = router;