// Contoh Routing
const express = require('express');
const router = express.Router();
const authController = require('../controllers/api/auth.controller');

// Auth
router.post('/auth', authController.auth);

module.exports = router;