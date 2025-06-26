const express = require('express');
const router = express.Router();
const validator = require('validator');
const User = require('../models/User');

router.post('/users',async(req,res,next) => {
    try{
        const{name,email} = req.body;
        if(!name || !email){
            return res.status(400).json({message : "please enter valid name or email"});
        }
        if(!validator.isEmail(email)){
            return res.status(400).json({message : "Invalid email"})
        }
        const existingUser = await User.findOne({$or: [{name},{email}]});
        if(existingUser){
            return res.status(409).json({message: "User or email already exists"});
        }
        const newUser = new User({name,email});
        await newUser.save();
        res.status(201).json(newUser);
    }catch(err){
        next(err);
    }
});
module.exports = router;