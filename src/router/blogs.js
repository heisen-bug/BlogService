const express = require('express')
const auth = require('../middleware/auth')

const router = new express.Router()
const Blog = require('../models/blogs')

router.post('/blogs', auth, async (req, res) => {
    const obj = req.body
    obj.author = req.user._id
    const blog = new Blog(obj)

    try {
        await blog.save()
        res.status(201).send(blog)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/myblogs', auth, async (req, res) => {
    try {
        await req.user.populate('blogs').execPopulate()
        res.status(200).send(req.user.blogs)
    } catch (error) {
        res.status(400).send()
    }
})

router.get('/myblogs/:id', auth, async (req, res) => {
    const _id = req.params.id
    try {
        const blog = await Blog.findOne({
            _id,
            owner: req.user._id
        })

        if(!blog){
            throw new Error({
                error: 'None of your blog posts found'
            })
        }
        res.status(200).send(blog)
    } catch (error) {
        res.status(404).send(error)
    }
})

router.patch('/myblogs/:id', auth, async (req, res) => {

    try {
        const updates = Object.keys(req.body)
        const allowedUpdates = ['title', 'body', 'tags']
        const isValid = updates.every(update => allowedUpdates.includes(update))
        

        if (!isValid) {
            res.status(400).send({
                error: 'Invalid Fields'
            })
        }

        const blog = await Blog.findOne({
            _id: req.params.id,
            author: req.user._id
        })

        
        if(!blog){
            throw new Error('asd')
        }

        updates.forEach(update => {
            blog[update] = req.body[update]
        })

        // console.log(blog)
        await blog.save()

        res.status(200).send(blog)
    } catch (error) {
        res.status(404).send('123')
    }


})


router.delete('/myblogs/:id', auth, async (req, res) => {
    try {
        await Blog.deleteOne({
            _id: req.params.id,
            author: req.user._id
        })
        res.status(200).send('deleted')
    } catch (error) {
        res.status(404).send(error)
    }
})

module.exports = router