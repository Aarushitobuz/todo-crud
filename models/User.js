const mongoose = require('mongoose');
const { trim } = require('validator');
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        trim: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address']
    }
},{
    timestamps: true
});
module.exports = mongoose.model('User',userSchema);