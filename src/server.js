const express = require('express')
require('./db/mongoose')
const app = express()
const port = process.env.PORT || 3000
const User = require('./models/users')
const Blog = require('./models/blogs')

app.use(express.json())

const blog = new Blog({
    title: 'Hello',
    body: 'bye',
})

blog.save()

app.listen(port, () => {
    console.log(`server is running on ${port}`)
})