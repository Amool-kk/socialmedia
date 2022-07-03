const mongoose = require('mongoose');
const dotenv = require('dotenv');

mongoose.connect(process.env.MONGODBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connection with Database is done!');
}).catch((err) => {
    console.log(`error in connection.js : ${err}`)
})