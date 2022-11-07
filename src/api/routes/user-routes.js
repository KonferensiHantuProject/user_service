// Contoh Routing
const express = require('express');
const router = express.Router();
const UsertController = require('../controllers/UserController');

// Defining Controller
const usertController = new UsertController();

// Register
router.get('/', usertController.register);

module.exports = router;