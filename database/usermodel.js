const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
    followers: [{type: String}
    ],
    follwing: [{type: String}
    ],
    tokens: [{
        tokenid: {
            type: String,
            required: true
        }
    }]
})

userSchema.methods.genrateToken = async function () {
    try {
        const token = jwt.sign({ _id: this._id.toString() }, process.env.KEY)
        this.tokens = this.tokens.concat({ tokenid: token })
        await this.save();
        return token;
    } catch (err) {
        console.log(`error is genrate token is : ${err}`);
    }
}


userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
})


const userDB = mongoose.model('user', userSchema);

module.exports = userDB;