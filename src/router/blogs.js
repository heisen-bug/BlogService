const express = require('express')
const router = new express.Router()
const Blog = require('../models/blogs')

router.post('/blogs', async (req, res) => {
    try {
        const blog = new Blog(req.body)
        await blog.save()
        res.status(201).send(blog)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/blogs/:id', async (req, res) => {
    const _id = req.params._id
    try {
        const blog = await Blog.find({
            _id
        })
        res.status(200).send(blog)
    } catch (error) {
        res.status(404).send(error)
    }
})

router.patch('/blogs/:id', async (req, res) => {

    try {
        const updates = Object.keys(req.body)
        const allowedUpdates = ['title', 'body', 'tags']
        const isValid = updates.every(update => allowedUpdates.includes(update))

        if (!isValid) {
            res.status(400).send({
                error: 'Invalid Fields'
            })
        }

        const blog = await Blog.find({
            _id: req.params.id
        })

        updates.forEach(update => {
            blog[update] = req.body[update]
        })

        await blog.save()

        res.status(200).send(blog)
    } catch (error) {
        res.status(404).send(error)
    }


})


router.delete('/blogs/:id', async (req, res) => {
    try {
        await Blog.deleteOne({
            _id: req.params.id
        })
        res.status(200).send()
    } catch (error) {
        res.status(404).send(error)
    }
})

module.exports = router