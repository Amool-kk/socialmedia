const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    postID: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    video: {
        type: String
    },
    text: {
        type: String
    },
    like:{
        type: String
    },
    comment : {
        type : String
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const posts = mongoose.model('post', postSchema)
module.exports = posts