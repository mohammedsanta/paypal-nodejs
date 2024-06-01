const jwt = require('jsonwebtoken')


function generateAccessToken(user) {

    const payload = {
        user
    }

    const secret = 'secret'
    const options = { expiresIn :'1000s' }

    return jwt.sign(payload,secret,options);

}

module.exports = generateAccessToken;