const express = require('express');
const router = express.Router();
const User = require('../models/User')

router.put('/users/:id',async(req,res,next) => {
    try{
        const {id} = req.params;
        const{name,email} = req.body;
        const user = await User.findById(id);
        if(!user){
            return res.status(404).json({message: "user not found"});
        }
        if(name) user.name = name;
        if(email)user.email =email;
        const updatedUser = await user.save();
        res.json(updatedUser);
    }catch(err){
        next(err);
    }
});
module.exports = router;