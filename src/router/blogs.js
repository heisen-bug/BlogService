const express = require('express')
const router = new express.Router()

router.get('', (req, res) => {
    res.send({
        msg: 'ROuter set up.'
    })
})

module.exports = router