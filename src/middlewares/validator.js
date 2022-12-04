const { body, validationResult, check } = require('express-validator');

// Models
const User = require('../models/user.model');

// Validation For Create User
createUserValidtaion = () => {
  return [
      // Cek username
      check('username', 'Username Tidak Valid').isString(),

      // Cek email
      check('email', 'Email Tidak Valid').isString(),

      // Cek Fist Name
      check('first_name', 'First Name Tidak Valid').isString(),

      // Cek Last Name
      check('last_name', 'Last Name Tidak Valid').isString(),
  
      // Custom Validation
      body('username').custom(async (value, { req }) => {
  
        // Cek Duplikatnya
        const duplicate = await User.findOne({ username: value });

        // If there is a duplicate
        if(duplicate){
            throw new Error('Username Sudah ada')
        }            

        return true;
  
      })
    ]
}

// Validation For Update User
updateUserValidtaion = () => {
  return [

      // Cek Username
      check('username', 'Username Tidak Valid').isString(),

      // Cek email
      check('email', 'Email Tidak Valid').isString(),

      // Cek Fist Name
      check('first_name', 'First Name Tidak Valid').isString(),

      // Cek Last Name
      check('last_name', 'Last Name Tidak Valid').isString(),
  
      // Custom Validation
      body('username').custom(async (value, { req }) => {
  
        // Cek Duplikatnya
        const duplicate = await User.find({ username: value });

        // If there is a duplicate
        if(duplicate != 0){
            if(duplicate.length == 1) {
                if(duplicate[0]._id != req.user.userId) {
                    throw new Error('Username Sudah adaa')
                }
            }else{
                throw new Error('Username Sudah ada')
            }            
        }

        return true;
  
      })
    ]
}
    
    
// Sending Error (Whether Error exist or not)
validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

  return next()
}

// Exporting modules
module.exports = {
  createUserValidtaion,
  updateUserValidtaion,
  validate
};