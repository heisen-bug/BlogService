const express = require('express')
const router = new express.Router()
const User = require('../models/users')
const auth = require('../middleware/auth')

// Create User or SignUp
router.post('/users', async (req, res) => {
    try {
        const user = new User(req.body)
        const token = await user.getAuthToken()

        res.status(201).send({
            user,
            token
        })
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/users/login', async (req, res) => {
    try {
        console.log(req.body)
        const user = await User.findByCredentials(req.body.email, req.body.password)
        // console.log(user)
        const token = await user.getAuthToken()
        // console.log(token)
        res.status(200).send({
            user,
            token
        })

    } catch (error) {
        res.status(404).send(error)
    }
})

// Logout
// router.post('/users/logout', auth, async (req, res) => {
    
// })

// get Profile
router.get('/myprofile', auth, async (req, res) => {
    res.send(req.user)
})

// update user
router.patch('/myprofile', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'password', 'email']
    const isValidUpdate = updates.every(update => allowedUpdates.includes(update))

    if (!isValidUpdate) {
        res.status(400).send({
            error: 'Invalid Updates'
        })
    }
    try {
        

        updates.forEach(update => {
            req.user[update] = req.body[update]
        })

        await req.user.save()

        res.status(200).send(req.user)
    } catch (error) {
        res.status(400).send(error)
    }
})

// delete user
router.delete('/myprofile', auth, async (req, res) => {
    try {
        // const user = req.user
        await req.user.remove()
        res.status(200).send('Deleted')
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router