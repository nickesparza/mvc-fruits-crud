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
// router.post('/users')

// two login routes
// GET to show signin form
// POST to log in and create session

// one logout route
// GET that calls destroy on current session
// add 'are you sure' page if time allows



// export router
module.exports = router
