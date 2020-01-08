const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Blog = require('./blogs')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Not a valid Email')
            }
        },
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    tokens: [{
        token: {
            type: String,
        }
    }]
}, {
    timestamps: true
})

userSchema.virtual('blogs', {
    ref: 'Blog',
    localField: '_id',
    foreignField: 'author'
})

userSchema.methods.getAuthToken = async function() {
    const user = this
    // console.log(user)
    const token = jwt.sign({ _id: user._id}, 'secretKey')
    user.tokens.push({ token })
    // console.log(token)
    await user.save()

    return token
}
 
userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar

    return userObject
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({
        email
    })
    // console.log(user)
    if(!user){
        throw new Error({
            error: 'Invalid Credentials'
        })
    }
    const isMatched = await bcrypt.compare(password, user.password)
    // console.log(123)
    if (!isMatched) {
        // console.log(12)
        throw new Error({
            error: 'Invalid Credentials'
        })
    }
    // console.log(user)
    return user

}
userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User