const express = require('express')
// router variable instead of app
const router = express.Router()
// import Fruit model to access database
const Fruit = require('../models/fruit')

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

// GET - Show
// localhost:3000/fruits/:id (id will change with each id that gets passed in)
router.get('/:id', (req, res) => {
    // intake ID as a parameter
    const fruitId = req.params.id
    // mongoose findById
    Fruit.findById(fruitId)
        .then(fruit => {res.json(fruit)})
        .catch(err => {res.json(err)})
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
                res.json(data)
            })
            .catch(console.error)
        })
        
    

    // return data as JSON to view
})

module.exports = router