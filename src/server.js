const express = require('express')
require('./db/mongoose')
const app = express()
const port = process.env.PORT || 3000
const blogRouter = require('./router/blogs')
const userRouter = require('./router/users')

const User = require('./models/users')
const Blog = require('./models/blogs')

app.use(blogRouter)
app.use(userRouter)
app.use(express.json())


app.listen(port, () => {
    console.log(`server is running on ${port}`)
})