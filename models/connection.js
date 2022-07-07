// require dotenv package to pull things like URI from the .env file
require('dotenv').config()
// require mongoose to use mongoose commands
const mongoose = require('mongoose')
// set database URI to a variable for use from the .env file
const DATABASE_URI = process.env.DATABASE_URI

const config = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
// connect to database using URI and config variables
mongoose.connect(DATABASE_URI, config)

mongoose.connection
    // handle opening the connection
    .on('open', () => console.log('Connected to Mongoose'))
    // close the connection
    .on('close', () => {console.log('Disconnected from Mongoose')})
    // handle errors if they arise
    // run code block on error using console.error to view
    .on('error', err => console.error(err))

module.exports = mongoose