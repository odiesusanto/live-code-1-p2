const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userSchema = new Schema({
    username: {
        type: String,
        unique: true
    }, 
    password: {
        type: String,
        minlength: 6
    }
}, {timestamps: true});

var User = mongoose.model('User', userSchema);

module.exports = User;