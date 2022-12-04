// Contoh Routing
const express = require('express');
const router = express.Router();
const { createUserValidtaion, updateUserValidtaion,validate} = require('../middlewares/validator');
const { authenticateJWT } = require('../middlewares/auth');
const userController = require('../controllers/api/user.controller');

// Register
router.post('/users', createUserValidtaion(), validate, userController.register);

// Update User
router.put('/users', authenticateJWT, updateUserValidtaion(), validate, userController.update);

// Delete User
router.delete('/users', authenticateJWT, userController.destroy);

module.exports = router;