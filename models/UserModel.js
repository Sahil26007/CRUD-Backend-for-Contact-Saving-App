const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required : [true,"Enter Username"]
    },
    email: {
        type: String,
        required : [true,"Enter Email"],
        unique: [true,"Email address already taken"]
    },
    password: {
        type: String,
        required : [true,"Enter Password"]
    },
},
{
    timestamps: true,
})

module.exports = mongoose.model('User', UserSchema);