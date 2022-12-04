// Contoh Routing
const express = require('express');
const router = express.Router();
const { createUserValidtaion, updateUserValidtaion,validate} = require('../middlewares/validator');
const { authenticateJWT } = require('../middlewares/auth');
const UserController = require('../controllers/api/user.controller');

// Defining Controller
const userController = new UserController();

// Register
router.post('/users', createUserValidtaion(), validate, userController.register);

// Update User
router.put('/users', authenticateJWT, updateUserValidtaion(), validate, userController.update);

// Delete User
router.delete('/users', authenticateJWT, userController.delete);

module.exports = router;