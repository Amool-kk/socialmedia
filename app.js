const express = require('express');
const app = express();
const cors = require('cors');

const port = process.env.PORT || 4000;
const dotenv = require('dotenv');
const cookieparser = require('cookie-parser');

dotenv.config();

// const controller = require('./controller/controller');
require('./database/connection');


app.use(cookieparser());
app.use((req,res,next) => {
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers", 
    "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Credentials","true")
    res.setHeader("Access-Control-Allow-Methods",  
    "GET, POST, PATCH, DELETE, OPTIONS");  
    next();
})
var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // For legacy browser support
}
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(require('./router'))

app.listen(port,()=>{
    console.log(`Connection is done at ${port}`);
})