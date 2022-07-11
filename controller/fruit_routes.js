const express = require('express')
// router variable instead of app
const router = express.Router()
// import Fruit model to access database
const Fruit = require('../models/fruit')

// DELETE - Delete a fruit from the database
router.delete('/:id', (req, res) => {
    const fruitId = req.params.id
    Fruit.findByIdAndRemove(fruitId)
        .then(() => {
            res.redirect('/fruits')
        })
        .catch(err => res.json(err))
})
// GET - Update form for changing fruits
router.get('/:id/edit', (req, res) => {
    // assign id from request parameter to a variable
    const fruitId = req.params.id
    // find that id in the database and render the edit page
    Fruit.findById(fruitId)
        .then(fruit => {
            res.render('fruits/edit', { fruit })
        })
        .catch(err => res.json(err))
})

// PUT - Update route for changing an existing fruit
router.put('/:id', (req, res) => {
    const fruitId = req.params.id
    // set checkbox from on/off to true/false
    req.body.readyToEat = req.body.readyToEat === 'on'
    // findbyIdAndUpdate uses the fruitId, then updates it with the request body, and uses new: true since this is a put request
    Fruit.findByIdAndUpdate(fruitId, req.body, { new: true })
        .then(fruit => {
            res.redirect(`/fruits/${fruit.id}`)
        })
        .catch(err => {res.json(err)})
})

// GET - Create form for new fruits
router.get('/new', (req, res) => {
    res.render('fruits/new')
})

// POST - Add new fruit to database
router.post('/', (req, res) => {
    // set checkbox from on/off to true/false
    req.body.readyToEat = req.body.readyToEat === 'on'
    // now that fruits can hold a username attribute, add a username to the fruit when it is created
    // upon login, username is saved to session object and can be called in other locations
    // using the ._id, set the owner field of the created fruit
    req.body.owner = req.session.userId
    // create item in database using request body
    Fruit.create(req.body)
        .then(fruit => {
            console.log(fruit)
            // res.json(fruit)
            res.redirect('/fruits')
        })
        .catch(err => res.json(err))
})

// GET - Index
// localhost:3000/fruits
router.get('/', (req, res) => {
    // find all fruits using mongoose
    Fruit.find({}).then(fruits => {
        // return fruits as json
        // res.json(fruit)
        res.render('fruits/index', {fruits: fruits})
    })
    .catch(err => {
        res.json(err)
    })
})

router.get('/mine', (req, res) => {
    Fruit.find({owner: req.session.userId})
        .then(fruits => {
            res.render('fruits/index', { fruits })
        })
        .catch(error => {
            console.log(error)
            res.json(error)
        })
})

// seed route
// insert many items into the database just by accessing this route
// localhost:3000/fruits/seed
router.get('/seed', (req, res) => {
    const startFruits = [
        { name: "Orange", color: "orange", readyToEat: false },
        { name: "Grape", color: "purple", readyToEat: false },
        { name: "Banana", color: "yellow", readyToEat: false },
        { name: "Strawberry", color: "red", readyToEat: false },
        { name: "Coconut", color: "brown", readyToEat: false },
    ]

    // if the database has anything in it, delete it first
    // will require a model to manipulate (import Fruit model to access)
    Fruit.deleteMany({})
        // insert startFruits data into the database
        .then(() => {
            // add data to database
            Fruit.create(startFruits)
            .then(data => {
                // return data as JSON to view
                res.json(data)
            })
            .catch(console.error)
        })
})

// GET - Show
// localhost:3000/fruits/:id (id will change with each id that gets passed in)
router.get('/:id', (req, res) => {
    // intake ID as a parameter
    const fruitId = req.params.id
    // mongoose findById
    Fruit.findById(fruitId)
        .then(fruit => {
            // res.json(fruit)
            res.render('fruits/show', {fruit})
        })
        .catch(err => {res.json(err)})
})

module.exports = router