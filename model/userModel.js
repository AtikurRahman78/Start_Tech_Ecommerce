const mongoose = require('mongoose');
const { Schema } = mongoose;


const userSchema = new Schema({

    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
    },
    emailVerified: {
        type: Boolean,
        default: false,
    },
    merchant: {
        type: Boolean,
        default: false,
    },
    role: {
        type: String,
        default: 'member',
        enum: ['member', 'merchant', 'admin'],
    },
    randomOtp: {
        type: String,
    },
    facebookId: {
        type: String,
    },
    linkedinId: {
        type: String,
    },
    updated: {
        type: Date,
    },
    created: {
        type: Date,
        default: Date.now,
    }

});



module.exports = mongoose.model('User', userSchema);