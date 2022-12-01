// Contoh Routing
const express = require('express');
const router = express.Router();
const Validator = require('../middlewares/validator');
const Auth = require('../middlewares/auth');
const UserController = require('../controllers/UserController');

// Defining Controller
const userController = new UserController();

// Register
router.post('/', Validator.createUserValidtaion(), Validator.validate, userController.register);

// Update User
router.put('/', Auth.authenticateJWT, Validator.updateUserValidtaion(), Validator.validate, userController.update);

module.exports = router;