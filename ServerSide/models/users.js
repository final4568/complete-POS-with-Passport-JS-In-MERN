const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name!"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Please enter your email!"],
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please enter your password!"]
    },
    role: {
        type: Number,
        trim: true
        // default: 0 // 0 = user, 1 = admin
    },
    avatar: {
        type: String,
        default: "https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png"
    },
    address: {
        type: String,
        required: [true, "Please enter your Address!"],
        minlength: 10
    },
    city: {
        type: String,
        required: [true, "Please enter your Address!"],
        trim: true
    },
    state: {
        type: String,
        required: [true, "Please enter your Address!"],
        trim: true
    },
}, {
    timestamps: true
});

const Users = mongoose.model("Users", userSchema)
module.exports = Users

