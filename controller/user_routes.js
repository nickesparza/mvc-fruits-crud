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
router.post('/login', async (req, res) => {
    console.log('this is the request object', req)
    // destructure data from request body
    const { username, password } = req.body
    // console.log('this is the username', username)
    // console.log('this is password', password)
    console.log('this is the session: ', req.session)

    // find user and check if they exist
    User.findOne({ username })
        .then( async (user) => {
            // if they do, compare entered password with stored hash
            if (user) {
                //compare password
                // bcrypt.compare evaluates to truthy or falsey value
                const result = await bcrypt.compare(password, user.password)
                // if passwords match, use newly created session object
                if (result) {
                    // if compare comes back truthy, store user properties in the session
                    req.session.username = username
                    req.session.loggedIn = true
                    // redirect to '/fruits' page
                    console.log('this is the session after login: ', req.session)
                    res.redirect('/fruits')
                } else {
                    // if passwords don't match, send error message
                    // send a res.json error message
                    res.json({ error: 'username or password incorrect' })
                }
            } else {
                // send an error if user doesn't exist
                res.json({ error: 'user does not exist' })
            }
        })
        // if username doesn't exist, redirect to signup page
        .catch(err => {
            console.log(err)
            res.json(err)
        })
        .catch(err => {res.redirect('/users/signup')})   
})
// one logout route
// GET that calls destroy on current session
router.get('/logout', (req, res) => {
    req.session.destroy(ret => {
        console.log('this is the logout error: ', ret)
        console.log('session has been destroyed')
        console.log(req.session)
        res.redirect('/fruits')
    })
})
// add 'are you sure' page if time allows

// export router
module.exports = router
