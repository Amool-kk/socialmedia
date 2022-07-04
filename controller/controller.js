const userDB = require('../database/usermodel');
const bcrypt = require('bcrypt');
const post = require('../database/postmodel')


exports.all = async (req, res) => {
    const result = await post.find();
    console.log(result.length)
    res.status(200).send({ message: result })
}


exports.userProfile = async (req, res) => {
    // const username = req.user.username;
    const profile = req.body.username.split(':')[1];
    // console.log(profile,username)
    const allPost = await post.find({ username: profile });
    const user = await userDB.find({ username: profile });

    console.log(profile)

    res.status(200).send({ message: [allPost, user] });
}

exports.getAllPost = async (req, res) => {
    const allPost = await post.find({})

    if (allPost.length == 0) {
        res.status(201).send({ message: "No Post" });
    } else {
        res.status(200).send({ message: allPost })
    }

}

exports.createPost = async (req, res) => {
    const { text, image, video } = req.body;

    console.log(req.body, req.user.email)
    const id = req.user.email
    const username = req.user.username;

    console.log(username, "0000000", req.user)

    if (!id || !text || !username) {
        res.status(400).send({ message: "Request can not be empty" });
    }

    const total = await post.find({});
    let postID = 0;
    if (total.length != 0) {
        postID = parseInt(total[total.length - 1].postID) + 1
    }

    const cpost = new post({
        id,
        postID: postID,
        username,
        text,
        like: 0,
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

    console.log(req.body, req.user)


}


function makeid(length) {
    var result = '';
    var characters = '0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}


exports.register = async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body)
    if (!email || !password) {
        res.status(400).send({ message: "Request can not be empty" })
    }

    let username = await email.split('@')[0];
    let userExist = await userDB.find({ username });

    while (userExist.length != 0) {
        username = username.concat(makeid(username.length))
        userExist = await userDB.find({ username });
        console.log(username)
    }

    const user = new userDB({
        email, username, password,
        followers: 0,
        follwing: 0
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
    console.log("00000000")
    res.clearCookie('jwt')
    res.status(200).send('user logout')
}