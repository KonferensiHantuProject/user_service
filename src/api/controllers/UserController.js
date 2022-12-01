// Model
const User = require('../models/User');

// Helpers
const ResponseBulider = require('../helpers/responseBuilder');

// Crypto JS
const CryptoJS = require('crypto-js');

// Validation
const { validationResult } = require('express-validator');

class UserController{

    // Register
    register = async (req, res) => {
        try {
            // Konstanta errors
            const errors = validationResult(req);

            // Kalau error
            if(!errors.isEmpty())
            {
                // Status
                res.status(422);

                // Return 
                return ResponseBulider.error(res, 422, errors.errors);   
            }else{
                // Hash Password
                var hash = CryptoJS.SHA3(req.body.password);

                // Adding Hashed Password
                req.body.password = hash.toString();

                // Register
                User.create(req.body, (error, result) => {
        
                    // Return 
                    return ResponseBulider.success(res, result);
                });   
            }

        } catch (error) {
            // If Error
            return ResponseBulider.error(res, 500, error.message);
        }
    }

    // Update User
    update = async (req, res) => {
        try {
            // Hash Password
            var hash = CryptoJS.SHA3(req.body.password);

            // Adding Hashed Password
            req.body.password = hash.toString();

            // Register
            User.create(req.body, (error, result) => {
       
                // Return 
                return ResponseBulider.success(res, result);
            });   

        } catch (error) {
            // If Error
            return ResponseBulider.error(res, 500, error.message);
        }
    }


}

module.exports = UserController