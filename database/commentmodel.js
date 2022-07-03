const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    postId: {
        type: String,
        required: true
    },
    text: {
        type: String
    },
    image: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    replys: [
        {
            reply: {
                id: {
                    type: String,
                    required: true
                },
                postId: {
                    type: String,
                    required: true
                },
                text: {
                    type: String
                },
                image: {
                    type: String
                }, date: {
                    type: Date,
                    default: Date.now
                }
            }
        }
    ]
})