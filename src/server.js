const express = require('express')
require('./db/mongoose')
const app = express()
const port = process.env.PORT || 3000
const blogRouter = require('./router/blogs')
const userRouter = require('./router/users')

app.use(express.json())
app.use(blogRouter)
app.use(userRouter)



app.listen(port, () => {
    console.log(`server is running on ${port}`)
})