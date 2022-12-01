// JWT 
const jwt = require("jsonwebtoken");

class Encryption{

    static token = (data) => {
      return jwt.sign(
        { userId: data._id, email: data.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
    };
    
}

module.exports = Encryption