const express = require('express');
const router = express.Router();

module.exports = (users) => {
    router.put('/users/:id',(req,res,next) => {
        try{
            const userID=parseInt(req.params.id);
            const{name,email} = req.body;
            const user = users.find(u => u.id === userID);
            if(!user){
                return res.status(404).json({message: "user not found"});
            }
            if(name && users.some(u => u.name === name && u.id!== userID)){
                return res.status(409).json({message: "User already exists"});
            }    
            if(email && users.some(u => u.email === email && u.id!== userID)){
                return res.status(409).json({message: "email already exists"});
            }
            user.name = name || user.name;
            user.email = email || user.email;
            res.json(user);
        }catch(err){
            next(err);
        }
    });
    return router;
}