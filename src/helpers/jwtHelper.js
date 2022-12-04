// JWT 
const jwt = require("jsonwebtoken");

createToken = (data) => {
      return jwt.sign(
        { userId: data._id, email: data.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
  };


module.exports = {
  createToken
}