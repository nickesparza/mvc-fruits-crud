/////////////////////////////////
// import dependencies
/////////////////////////////////
// this allows us to load our env variables
require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const methodOverride = require('method-override')
const fruitRoutes = require('./controller/fruit_routes')
const userRoutes = require('./controller/user_routes')

////////////////////////////////////////////
// Create our express application object
////////////////////////////////////////////
const app = require('liquid-express-views')(express())

////////////////////////////////////////////
// Middleware
////////////////////////////////////////////
// this is for request logging
app.use(morgan('tiny'))
app.use(methodOverride('_method'))
// parses urlencoded request bodies
app.use(express.urlencoded({ extended: false }))
// to serve files from public statically
app.use(express.static('public'))
// require router module from fruit_routes.js
app.use('/fruits', fruitRoutes)
app.use('/users', userRoutes)

////////////////////////////////////////////
// Routes
////////////////////////////////////////////
app.get('/', (req, res) => {
	// res.send('your server is running')
	res.redirect('/fruits')
})

////////////////////////////////////////////
// Server Listener
////////////////////////////////////////////
const PORT = process.env.PORT
app.listen(PORT, () => {
	console.log(`app is listening on port: ${PORT}`)
})
