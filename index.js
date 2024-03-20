const express = require('express');
const cors = require('cors');
const { connection } = require('./db');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { userModel } = require('./model/user.model');
const { bookRouter } = require('./routes/book.route');


const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("<h1>Welcome to Masai Library</h1>")
})

//for user registration
app.post('/register', async(req, res) => {
    const {name, email, password, isAdmin} = req.body;
    const newEmail = await userModel.findOne({email});
    if(newEmail){
        return res.send({"msg": "User already exist with this email!"})
    }
    try{
        bcrypt.hash(password, 5, async(err, hash) => {
            if(err){
                res.status(200).json({"msg": err})
            }else{
                const newUser = new userModel({
                    name,
                    email,
                    password: hash,
                    isAdmin
                })
                await newUser.save();
                res.status(200).json({"msg": "new user has been registered", "user": newUser})
            }
        })
    }
    catch(err){
        res.status(400).json({'error': err})
    }
});

//for user login
app.post('/login', async(req, res) => {
    const {email, password} = req.body;
    const user = await userModel.findOne({email});
    if(!user){
        return res.send({"msg": "This user does not exist!"})
    }
    try{
        bcrypt.compare(password, user.password, (err, result) => {
            if(result){
                const token = jwt.sign({"userName": user.name, "userId": user._id, "isAdmin": user.isAdmin}, "masai");
                res.status(200).json({"msg": "user login successfully!", "token": token})
            }else{
                res.status(200).json({"msg": "wrong password", "error": err})
            }
        })
    }
    catch(err){
        res.status(400).json({"error": err})
    }
})

//to use book router
app.use('/books', bookRouter);

app.listen(process.env.port, async() => {
    try{
        await connection;
        console.log("Server connected to db")
        console.log("Server is running at port 4000")
    }
    catch(err){
        console.log(err)
    }
})