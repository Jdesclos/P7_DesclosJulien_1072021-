const jwt = require ('jsonwebtoken')


module.exports = {
    generateTokenForUser: function(userData) {
      return jwt.sign({
        userId: userData.id,
        isAdmin: userData.isAdmin
      },
      process.env.TOKEN_SECRET,
      {
        expiresIn: '2h'
      })
    }
  };