// Contoh Routing
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

// Defining Controller
const userController = new UserController();

// Register
router.post('/', userController.register);

module.exports = router;