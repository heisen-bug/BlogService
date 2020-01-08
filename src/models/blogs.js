const mongoose = require('mongoose')
const User = require('./users')
const validator = require('validator')

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        validate(value) {
            if(value.length >= 150){
                throw new Error({
                    error: 'length of title should be less the 150 characters'
                })
            }
        },
    },
    body: {
        type: String,
        required: true,
        trim: true,
    },
    tags: {
        type: [String],
        trim: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
},{
    timestamps: true
})

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog