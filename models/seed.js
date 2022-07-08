// this file runs on `npm run seed`
// how to control who can use the seed route with a script
// import dependencies
const mongoose = require('./connection')
const Fruit = require('./fruit')

// seed code
const db = mongoose.connection

// runs callback function when the db connection is opened from this file
db.on('open', () => {
    // array of starter fruits
    const startFruits = [
        { name: "Orange", color: "orange", readyToEat: false },
        { name: "Grape", color: "purple", readyToEat: false },
        { name: "Banana", color: "yellow", readyToEat: false },
        { name: "Strawberry", color: "red", readyToEat: true },
        { name: "Coconut", color: "brown", readyToEat: true },
    ]

    // this file runs exactly once and closes after any operation
    // when seeding data, usually clear out the db first
    Fruit.remove({})
    // then, populate db with starter data
        .then(deletedFruits => {
            console.log(`this is what removed returns:`)
            console.log(deletedFruits)
            Fruit.create(startFruits)
                .then(data => {
                    console.log(data)
                    db.close()
                })
                .catch(err => {
                    res.json(err)
                    db.close()
                })
        })
        .catch(err => {
            res.json(err)
            db.close()
        })
    // regardless of success, close the db connection at conclusion of operation
})