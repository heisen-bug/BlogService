const express = require('express')
const router = new express.Router()

router.get('/hello', (req, res) => {
    res.send({
        msg: 'router says hello'
    })
})

module.exports = router