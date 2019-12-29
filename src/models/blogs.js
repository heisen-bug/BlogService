const mongoose = require('mongoose')
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
    publishedOn: {
        type: Date,
        default: Date.now(),
    },
    tags: {
        type: [String],
        trim: true,
    }
})

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog