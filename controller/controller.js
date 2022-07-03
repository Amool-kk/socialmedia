const userDB = require('../database/usermodel');
const bcrypt = require('bcrypt');
const post = require('../database/postmodel')


exports.all = async (req, res) => {
    const result = await post.find();
    console.log(result.length)
    res.status(200).send({ message: result })
}

exports.createPost = async (req, res) => {
    const { id, text, image, video } = req.body;

    if (!id || !text) {
        res.status(400).send({ message: "Request can not be empty" });
    }

    const total = await post.find();

    const cpost = new post({
        id,
        postID: total.length,
        text
    })

    const result = await cpost.save();

    if (result) {
        res.status(200).send({ message: result })
    } else {
        res.status(500).send({ message: err.message + " Some error occured please try again!" })
    }
}

exports.createComment = async (req, res) => {
    const { id, postID, text, image } = req.body;




}


exports.register = async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body)
    if (!email || !password) {
        res.status(400).send({ message: "Request can not be empty" })
    }

    const user = new userDB({
        email, password
    })

    const result = await user.save();

    if (result) {
        res.status(200).send({ message: result })
    } else {
        res.status(500).send({ message: err.message + " Some error occured please try again!" })
    }
}

exports.login = async (req, res) => {
    const { email, password } = req.body;
    console.log(password, email)

    if (!email || !password || password == null || email == null) {
        res.status(400).send({ message: "Request can not be empty" })
    } else {
        const userExist = await userDB.findOne({ email: email })
        console.log(userExist)

        if (userExist) {
            const isMatch = await bcrypt.compare(password, userExist.password)
            if (isMatch) {
                const token = await userExist.genrateToken()
                res.cookie('jwt', token, {
                    httpOnly: true
                })
                const results = await userExist.save()
                res.status(200).send({ message: "Login Successfuly" });
            } else {
                res.status(400).send({ message: "User details is not correct!" });
            }
        } else {
            res.status(400).send({ message: "User not found!" });
        }
    }


}

exports.logout = (req, res) => {
    res.clearCookie('jwt')
    res.status(200).send('user logout')
}