const express = require('express');
const router = express.Router();

module.exports = (users) => {
    router.get('/all-users',(req,res,next) => {
        try{
            res.json(users);
        }catch(err){
            next(err);
        }
    });
    return router;
}