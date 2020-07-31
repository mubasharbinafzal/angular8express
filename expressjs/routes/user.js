const router = require("express").Router();
const User = require("../model/User");
const bcrypt = require ("bcryptjs");
const jwt = require("jsonwebtoken");

router.post('/register', async (req,res)=>{
    // checking user email
    const emailExit = await User.findOne({
        email:req.body.email
    });
    if (emailExit) return res.status(400).send("Email is already Exists");
    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password , salt);
    // Create a New user
    const user =  new User({
        name: req.body.name,
        email:req.body.email,
        password:hashedPassword
    });
    try {
        const savedUser = await user.save();
        res.send(savedUser);
        
    } catch (error) {
        res.status(400).send(error);
    }
});

router.post('/login', async (req,res)=>{

    // checking Email id in database
 
    const user = await User.findOne({email: req.body.email});

    if (!user) return res.status(400).send("Wrong Email");

    // checking password 
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send("Wrong password");

    const token = jwt.sign({_id:user._id}, process.env.TOKEN_SECRET);
    res.header("auth-token",token).send({token:token});
});
module.exports = router;