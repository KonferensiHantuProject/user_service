// Contoh Routing
const express = require('express');
const router = express.Router();
const Validator = require('../middlewares/validator');
const AuthController = require('../controllers/AuthController');

// Defining Controller
const authController = new AuthController();

// Defining Validator
const validator = new Validator();

// Auth
router.post('/', authController.auth);

module.exports = router;