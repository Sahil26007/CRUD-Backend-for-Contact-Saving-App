const asyncHandler = require('express-async-handler');
const User = require('../models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')


const registerUser = asyncHandler(async (req,res)=>{
    const {username,email,password} = req.body;
    if(!username || !email || !password){
        res.status(400);
        throw new Error("All fields are necessary");
    }
    const userAvailable = await User.findOne({email});
    if(userAvailable){
        res.status(400);
        throw new Error("email Already taken!!");
    }
    // creating hash password
    const hashPassword = await bcrypt.hash(password,10);
    console.log(`Hash Password : ${hashPassword}`);
    const user = await User.create({
        username,
        email,
        password: hashPassword,
    });
    if(user){
        res.status(201).json({_id: user.id ,email:user.email});
    }
    else{
        res.status(400);
        throw new Error("Invalid data provided!");
    }
    res.json({message: "User register"});
})



const currentUser = asyncHandler(async (req,res)=>{
    res.json(req.user);
})


const userLogin = asyncHandler(async (req,res)=>{
    const {email,password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error ("All field are mandatory");
    }
    const user = await User.findOne({email});
    if(user && (await bcrypt.compare(password,user.password))){
        const accessToken = jwt.sign({
            user:{
                id: user.id,
                username : user.username,
                email : user.email,
            },
        },process.env.ACCESS_TOKEN_SECERT,
            {expiresIn:"15m"}
        );
        res.status(200).json({accessToken});
    }
    else{
        res.status(401);
        throw new Error('invalid credentials');
    }

})

module.exports = {
    registerUser,
    currentUser,
    userLogin
}