// Contoh Routing
const express = require('express');
const router = express.Router();
const Validator = require('../middlewares/validator');
const AuthController = require('../controllers/api/auth.controller');

// Defining Controller
const authController = new AuthController();

// Auth
router.post('/auth', authController.auth);

module.exports = router;