const express = require('express')
// router variable instead of app
const router = express.Router()
// import Fruit model to access database
const Fruit = require('../models/fruit')

// POST route to create new comment
// localhost/comments/:fruitId <- single fruit can have many comments; find by ID, then add any comments
router.post('/:fruitId', (req, res) => {
    const fruitId = req.params.fruitId
    req.body.author = req.body.userId
    Fruit.findById(fruitId)
        // after finding a fruit, take that fruit and add a comment to it
        .then(fruit => {
            // each fruit now has a comment field inside it
            fruit.comments.push(req.body)
            // return and call .save to modify a document inside of a find function
            return fruit.save()
        })
        .then(fruit => {
            res.redirect(`/fruits/${fruit._id}`)
        })
        .catch(err => res.json(err))
})

// DELETE route to delete a comment
router.delete('/delete/:fruitId/:commentId', (req, res) => {
    const fruitId = req.params.fruitId
    const commentId = req.params.commentId

    // find the fruit by its ID
    Fruit.findById(fruitId) // return the single fruit document we want
    // fruits can have many comments, so find the comment by its ID
        .then(fruit => {
            const comment = fruit.comments.id(commentId)
            // remove the comment from the fruit
            comment.remove()
            // return saved comment
            return fruit.save()
        })
        .then(fruit => {
            res.redirect(`/fruits/${fruitId}`)
        })
        .catch(err => res.json(err))
    
})
module.exports = router