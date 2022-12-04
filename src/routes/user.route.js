// Contoh Routing
const express = require('express');
const router = express.Router();
const validation = require('../middlewares/validator');
const auth = require('../middlewares/auth');
const userController = require('../controllers/api/user.controller');

// Register
router.post('/users', validation.createUserValidtaion(), validation.validate, userController.register);

// Update User
router.put('/users', auth.authenticateJWT, validation.updateUserValidtaion(), validation.validate, userController.update);

// Delete User
router.delete('/users', auth.authenticateJWT, userController.destroy);

module.exports = router;