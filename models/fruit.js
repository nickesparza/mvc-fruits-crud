// using a connected mongoose instance, not a new one from node_modules
const mongoose = require('./connection')

// extract the Schema and model keys from mongoose
const { Schema, model } = mongoose

const fruitSchema = new Schema({
    name: String,
    color: String,
    readyToEat: Boolean,
    username: { type: String, default: '' }
}, {
    timestamps: true
})

// this collection will be called fruits
const Fruit = model('Fruit', fruitSchema)

module.exports = Fruit