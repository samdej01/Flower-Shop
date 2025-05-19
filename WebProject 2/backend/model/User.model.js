const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
    },
    phone: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    refreshToken: {
        type: String,
    }
}, { timestamps: true });

userSchema.methods.generateAccessToken = function() {
    return jwt.sign({
        _id: this._id,
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email
    }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
};

userSchema.methods.generateRefreshToken = function() {
    return jwt.sign({
        _id: this._id
    }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });
};

module.exports = mongoose.model('User', userSchema);
