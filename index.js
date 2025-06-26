require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const app = express();

const postUserRoute = require('./routes/postUser');
const getAllUsersRoute = require('./routes/getAllUsers');
const updateUserRoute = require('./routes/updateUser');
const deleteUserRoute = require('./routes/deleteUser');

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        app.use(postUserRoute);
        app.use(getAllUsersRoute);
        app.use(updateUserRoute);
        app.use(deleteUserRoute);

        app.use((err, req, res, next) => {
            console.error(err.stack);
            res.status(err.status || 500).json({
                error: err.message || "Something went wrong"
            });
         });

        app.listen(process.env.PORT, () => {
            console.log(` Server running at http://localhost:${process.env.PORT}`);
        });
    })
    .catch(err => {
        console.error(' MongoDB connection error:', err);
    });
