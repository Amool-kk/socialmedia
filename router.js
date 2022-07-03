const express = require('express');
const jwt = require('jsonwebtoken');
const controller = require('./controller/controller');
const path = require('path')
const user = require('./database/usermodel');
const post = require('./database/postmodel');
const auth = require('./auth/auth')


const router = express.Router();

router.get('/', auth, (req, res) => {
    res.status(200).send({ message: "Done" })
})

router.get('/logout', auth, controller.logout)

router.get('/home', controller.all);

router.post('/createpost', controller.createPost)

router.post('/register', controller.register);
router.post('/login', controller.login);


module.exports = router;