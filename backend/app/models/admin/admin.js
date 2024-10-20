const mongoose = require("mongoose");
const jwt = require("jsonwebtoken")

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
    },
    mobile_number: {
        type: Number,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
}, { timestamps: true, });

// generating jwt token
adminSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET_KEY, { expiresIn: "30d" });
    return token;
}

let Admin = mongoose.model("Admin", adminSchema)

module.exports = Admin
