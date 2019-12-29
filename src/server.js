const express = require('express')
require('./db/mongoose')
const app = express()
const port = process.env.PORT || 3000
const User = require('./models/users')

app.use(express.json())


app.listen(port, () => {
    console.log(`server is running on ${port}`)
})