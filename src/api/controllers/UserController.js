// Model
const User = require('../models/User');

// Helpers
const ResponseBulider = require('../helpers/responseBuilder');

class UserController{

    // Register
    register = async (req, res) => {
        try {

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