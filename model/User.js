const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    full_name: { type: String, required: false },
    registrationDate: { type: Date, default: Date.now },
    verificationStatus: { type: Boolean, default: false }, // For user verification
    profilePicture: { type: String, 
        default: './default_pic.jpg' 
    },
    activated: { type: Boolean, default: true}, // false if deleted account
});

const User = mongoose.model('User', userSchema);

module.exports = User;