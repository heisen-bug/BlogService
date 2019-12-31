const express = require('express')
const router = new express.Router()
const User = require('../models/users')


// Create User or SignUp
router.post('/users', async (req, res) => {
    try {
        const user = new User(req.body)
        await user.save()
        res.status(201).send(user)
    } catch (error) {
        res.status(400).send(error)
    }
})

// get Users
router.get('/users', async (req, res) => {
    console.log(123)
    try {
        const users = await User.find({})
        // console.log(123)
        res.status(200).send(users)
    } catch (error) {
        res.status(400).send(error)
    }
})

// get user
router.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user) {
            res.status(400).send('No such user found')
        }
        res.status(200).send(user)
    } catch (error) {
        res.status(400).send(error)
    }
})

// update user
router.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'password', 'email']
    const isValidUpdate = updates.every(update => allowedUpdates.includes(update))

    if (!isValidUpdate) {
        res.status(400).send({
            error: 'Invalid Updates'
        })
    }
    try {
        const user = await User.findById(req.params.id)

        if (!user) {
            res.status(400).send({
                error: 'No such user exists'
            })
        }

        updates.forEach(update => {
            user[update] = req.body[update]
        })

        await user.save()

        res.status(200).send(user)
    } catch (error) {
        res.status(400).send(error)
    }
})

// delete user
router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.deleteOne({
            _id: req.params.id
        })
        if (!user) {
            res.status(400).send({
                error: 'No Such User Found'
            })
        }
        res.status(200).send(user)
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router