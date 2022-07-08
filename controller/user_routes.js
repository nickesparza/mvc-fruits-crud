// import dependencies
const express = require('express')
const User = require('../models/user')
// bcrypt is used to hash/encrypt passwords
const bcrypt = require('bcryptjs')

// router variable instead of app
const router = express.Router()

// list out routes

// two signup routes
// GET to show signup form
router.get('/signup', (req, res) => {
    res.render('users/signup')
})
// POST to make db request
router.post('/signup', async (req, res) => {
    console.log('this is our request body', req.body)
    // encrypt password
    // that is the reason for making this function async
    // password hashing takes some time, so wait until it's complete before progressing to the next steps
    // use bcrypt to encrypt password
    // wait for bcrypt to run salt rounds before continuing
    // salt rounds - encrypt X amount of times before settling on one encryption
    req.body.password = await bcrypt.hash(req.body.password, await bcrypt.genSalt(10))
    console.log('this is our request body after hash', req.body)

    // now that the password is hashed, create user
    User.create(req.body)
        // if created successfully, redirect to login page
        .then(user => {
            console.log('this is the new user', user)
            res.redirect('/users/login')
        })
        // if creation fails, send error
        .catch(err => {
            console.log(err)
            res.json(err)
        })
})

// two login routes
// GET to show signin form
router.get('/login', (req, res) => {
    res.render('users/login')
})
// POST to log in and create session

// one logout route
// GET that calls destroy on current session
// add 'are you sure' page if time allows



// export router
module.exports = router
