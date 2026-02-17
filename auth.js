const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register
router.post("/register", async (req,res)=>{
    const {name,email,password} = req.body;

    const hashed = await bcrypt.hash(password,10);

    const user = new User({name,email,password:hashed});
    await user.save();

    res.json({message:"User Registered"});
});

// Login
router.post("/login", async (req,res)=>{
    const {email,password} = req.body;

    const user = await User.findOne({email});
    if(!user) return res.json({message:"User Not Found"});

    const valid = await bcrypt.compare(password,user.password);
    if(!valid) return res.json({message:"Wrong Password"});

    const token = jwt.sign({id:user._id},"secretkey");
    res.json({token});
});

module.exports = router;
