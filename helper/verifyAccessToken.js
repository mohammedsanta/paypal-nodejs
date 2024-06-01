const jwt = require('jsonwebtoken')

function verifyAccessToken(token) {

    const secret = 'secret'

    try {

        const decoded = jwt.verify(token,secret)

        return { success: true, data : decoded }

    } catch (error) {

        return { success: false, error: error.message }

    }

}

module.exports = verifyAccessToken;