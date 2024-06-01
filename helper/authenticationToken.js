const jwt = require('jsonwebtoken')
const verifyAccessToken = require('./verifyAccessToken')

function authenticationToken(req,res,next) {

    const getCookie = req.headers.cookie
    const token = getCookie.split('=')[1]

    if(!token) res.status(401)

    const result = verifyAccessToken(token);

    if(!result.success) return res.status(403).send({ error : result.error })

    req.user = result.data

    next()

}

module.exports = authenticationToken