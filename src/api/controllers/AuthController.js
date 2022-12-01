// Model
const User = require('../models/User');

// JWT Helper
const JWTHelper = require('../helpers/jwtHelper');

// Helpers
const ResponseBulider = require('../helpers/responseBuilder');

// Crypto JS
const CryptoJS = require('crypto-js');

// Validation
const { validationResult } = require('express-validator');

class AuthController{

    // Auth User
    auth = async (req, res) => {
        try {

            // Getting all user
            const user = await User.findOne({ email: req.body.email });

            // Hash Password
            var hash = CryptoJS.SHA3(req.body.password);

            // Checking Password
            if(req.body.email != user.email || user.password != hash.toString())
            {
                return ResponseBulider.error(res, 400, 'Username atau Password Salah');
            }

            // Preparing Token
            const token = JWTHelper.token(user);
            
            // Updating Token
            User.updateOne(
            {
                _id: user._id
            },
            {
                $set: {
                    token: token
                }
            }
            ).then(async (result) => {
            
                // Getting one post 
                const updateUser = await User.findOne({ _id: user._id });

                // Redirect 
                return ResponseBulider.success(res, updateUser);
            });

        } catch (error) {
            // If Error
            return ResponseBulider.error(res, 500, error.message);
        }
    }


}

module.exports = AuthController