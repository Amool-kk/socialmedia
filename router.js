const express = require('express');
const jwt = require('jsonwebtoken');
const controller = require('./controller/controller');
const path = require('path')
const user = require('./database/usermodel');
const post = require('./database/postmodel');
const auth = require('./auth/auth');

const router = express.Router();

// const multer = require('multer');
// const {v4:uuidv4} = require('uuid');


// const storage  = multer.diskStorage({
//     destination: function(req,file,cb){
//         cb(null,'../uploads')
//     }, 
//     filename: function(req,file,cb){
//         cb(null,uuidv4() + '-'+Date.now()+path.extname(file.originalname));
//     }
// })

// const fileFilter = (req,file,cb)=>{
//     console.log(file,"0000000")
//     const allowedFileTypes = ['image/jpeg','image/jpg','image/png'];
//     if(allowedFileTypes.includes(file.minetype)){
//         cb(null,true);
//     }else{
//         cb(null,false);
//     }
// }

// let upload = multer({storage,fileFilter});

// router.post('/createpost',auth,upload.single('image'),(req,res)=>{
//     console.log(req.body)
//     console.log(req.file)
// })






router.get('/', auth, (req, res) => {
    res.status(200).send({ message: req.user.username })
})

router.get('/logout', auth, controller.logout)

router.get('/home', controller.all);

router.post('/createpost', auth, controller.createPost);

router.post('/like',auth,controller.like);

router.get('/getallpost', controller.getAllPost);
router.post('/profile', auth, controller.userProfile);

router.post('/follow', auth, controller.addFollower);
router.post('/unfollow', auth, controller.unFollower);


router.post('/register', controller.register);
router.post('/login', controller.login);


module.exports = router;