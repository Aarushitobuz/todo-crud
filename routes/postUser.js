const express = require('express');
const router = express.Router();
const validator = require('validator');

module.exports = (users,idCounterRef) => {
    router.post('/users',(req,res,next) => {
        try{
            const{name,email} = req.body;
            if(!name || !email){
                return res.status(400).json({message : "please enter valid name or email"});
            }
            if(!validator.isEmail(email)){
                return res.status(400).json({message : "Invalid email"})
            }
            const isDuplicate = users.some(
                user => user.name === name || user.email === email 
            );
            if(isDuplicate){
                return res.status(404).json({message : "Name or email already exists"});
            }
            const newUser = {id: idCounterRef.value++,name,email};
            users.push(newUser);
            res.status(201).json(newUser);
        }catch(err){
            next(err);
        }
    });
    return router;
}