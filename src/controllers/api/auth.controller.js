// Model
const User = require('../../models/User');

// JWT Helper
const { createToken } = require('../../helpers/jwtHelper');

// Helpers
const ResponseBulider = require('../../helpers/responseBuilder');

// Crypto JS
const CryptoJS = require('crypto-js');

// Auth User
auth = async (req, res) => {
    try {

        // Getting one user
        const user = await User.findOne({ email: req.body.email });

        // Checking Email
        if(!user) throw new Error('Email Belum Terdaftar');

        // Hash Password
        var hash = CryptoJS.SHA3(req.body.password);

        // Checking Password
        if(req.body.email != user.email || user.password != hash.toString())
        {
            // Status
            res.status(403);

            throw new Error('Email atau Password Salah')
        }

        // Preparing Token
        const token = createToken(user);
        
        // Update User
        const process = await user.updateOne(
        {
            $set: {
                token: token
            }
        })

        // Checking Update Process
        if(process.acknowledged) {
            const updatedUser = await User.findOne({ email: req.body.email });
            
            // Redirect 
            return ResponseBulider.success(res, updatedUser);
        }else{
            // Status
            res.status(403);
            
            // Fail
            throw new Error('Update Gagal')
        }

    } catch (error) {
        // If Error
        return ResponseBulider.error(res, res.statusCode, error.message);
    }
}


module.exports = {
    auth
};