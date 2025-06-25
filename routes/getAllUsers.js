const express = require('express');
const router = express.Router();

module.exports = (users) => {
    router.get('/all-users',(req,res) => {
        res.json(users);
    });
    return router;
}