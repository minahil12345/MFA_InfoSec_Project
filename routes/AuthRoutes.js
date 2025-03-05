// routes/index.js
const express = require('express');
const { sendMFACode, checkMFACode, checkSecurityQuestion, userLogin } = require('../controllers/AuthController');

const router = express.Router();

router.post('/multifactor', sendMFACode);
router.post('/multifactor/check', checkMFACode);
router.post('/securityquestion', checkSecurityQuestion);
router.post('/login', userLogin)

module.exports = router;
