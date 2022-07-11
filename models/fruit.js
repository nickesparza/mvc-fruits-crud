// using a connected mongoose instance, not a new one from node_modules
const mongoose = require('./connection')
const commentSchema = require('./comment')

// extract the Schema and model keys from mongoose
const { Schema, model } = mongoose

const fruitSchema = new Schema({
    name: String,
    color: String,
    readyToEat: Boolean,
    // single user's ObjectId (_id field) from the users collection that associates a fruit with a specific user
    owner: { 
        type: Schema.Types.ObjectId, // a single user's ._id
        ref: 'User' // const User = model('User', userSchema) the string of 'User' is how model is referenced
    },
    comments: [commentSchema]
}, {
    timestamps: true
})

// this collection will be called fruits
const Fruit = model('Fruit', fruitSchema)

module.exports = Fruit