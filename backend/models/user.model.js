const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    fullName: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    otp: {
        type: String
    },
    otpExpiry: {
        type: Date
    },
    password:{
        type: String
    },
    verified: {
        type: Boolean,
        default: false
    }  
})

const User = mongoose.model('User', userSchema)

module.exports = User;