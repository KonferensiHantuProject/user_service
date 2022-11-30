// Model
const User = require('../models/User');

// Helpers
const ResponseBulider = require('../helpers/responseBuilder');

// Crypto JS
const CryptoJS = require('crypto-js');

class UserController{

    // Register
    register = async (req, res) => {
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