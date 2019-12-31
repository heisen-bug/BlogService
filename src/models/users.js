const mongoose = require('mongoose')
const validator = require('validator')


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
}, {
    timestamps: true
})


const User = mongoose.model('User', userSchema)

module.exports = User