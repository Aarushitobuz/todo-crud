const express = require('express');
const router = express.Router();

module.exports = (users) => {
    router.delete('/users/:id', (req, res,next) => {
        try{
            const userID = parseInt(req.params.id);
            const index = users.findIndex(u => u.id === userID);

            if (index === -1) {
                return res.status(404).json({ message: "User not found" });
            }

            users.splice(index, 1);
            return res.json({ message: "User deleted" });
        }catch(err){
            next(err);
        }
    });

    return router;
};
