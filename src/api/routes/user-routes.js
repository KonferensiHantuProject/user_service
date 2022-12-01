// Contoh Routing
const express = require('express');
const router = express.Router();
const Validator = require('../middlewares/validator');
const UserController = require('../controllers/UserController');

// Defining Controller
const userController = new UserController();

// Defining Validator
const validator = new Validator();

// Register
router.post('/', validator.userValidtaion(), validator.validate, userController.register);

// Update User
router.put('/', userController.update);

module.exports = router;