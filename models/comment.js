///////////////////////////
// import dependencies
///////////////////////////
const mongoose = require('./connection')

const { Schema } = mongoose

const commentSchema = new Schema({
    note: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId, // single User ._id
        ref: 'User' // this is the string value from when User model was created
    }
}, {
    timestamps: true
})

module.exports = commentSchema