const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth.controller');
const {
  validateLoginData,
  validateRegisterData,
} = require('../config/validator.config');

router.post('/register', validateRegisterData, authController.register);
router.post('/login', validateLoginData, authController.login);
router.get('/verify', authController.verifyToken);

module.exports = router;
