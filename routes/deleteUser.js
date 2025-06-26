const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.delete('/users/:id', async(req, res,next) => {
    try{
        const {id} = req.params;
        const result = await User.findByIdAndDelete(id);
        if(!result){
            return res.status(404).json({message : "User not found"});
        }
    res.json({ message: "User deleted" });
    }catch(err){
        next(err);
    }
});
module.exports = router;
