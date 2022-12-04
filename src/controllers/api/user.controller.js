// Model
const User = require('../../models/User');

// Helpers
const ResponseBulider = require('../../helpers/responseBuilder');

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
                // Errors
                errors.errors.forEach(error => {
                    // Status
                    res.status(422);

                    // Throw error
                    throw new Error(error.msg);
                });

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
            return ResponseBulider.error(res, res.statusCode, error.message);
        }
    }

    // Update User
    update = async (req, res) => {
        try {
            // Konstanta errors
            const errors = validationResult(req);

            // Kalau error
            if(!errors.isEmpty())
            {
                // Errors
                errors.errors.forEach(error => {
                    // Status
                    res.status(422);

                    // Throw error
                    throw new Error(error.msg);
                });

            }else{
                // Hash Password
                var hash = CryptoJS.SHA3(req.body.password);
    
                // Adding Hashed Password
                req.body.password = hash.toString();
    
                // Finding user
                const user = await User.findOne({  _id: req.user.userId });
                
                if(user == null) {
                    // Status
                    res.status(404);

                    // Throw error
                    throw new Error('User Not Found');
                }

                // Update User
                await user.updateOne(req.body).then( (result) =>{
                    return ResponseBulider.success(res, result);
                });
            }

        } catch (error) {
            // If Error
            return ResponseBulider.error(res, res.statusCode, error.message);
        }
    }

    // Delete User
    delete = async (req, res) => {
        try {

            // Delete Process
            User.deleteOne({ _id: req.user.userId }).then((result) => {
                
                // Redirect 
                return ResponseBulider.success(res, result);
            });     

        } catch (error) {
            // If Error
            return ResponseBulider.error(res, 500, error.message);
        }
    }

}

module.exports = UserController