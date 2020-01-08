const jwt = require('jsonwebtoken')
const User = require('../models/users')

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const payLoad = jwt.verify(token, 'secretKey')
        const user = await User.findOne({
            _id: payLoad._id
        })

        if (!user) {
            throw new Error()
        }

        user.tokens.forEach(tokenObj => {
            if (tokenObj.token === token) {
                req.user = user
                req.token = token
            }
        })

        if (!req.user) {
            throw new Error()
        }

        next()
    } catch (error) {
        res.send({
            error: 'Please Authenticate'
        })
    }

}

module.exports = auth