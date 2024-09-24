const mongoose = require("mongoose");
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
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
    isAcceptTermsAndConditions: {
        type: Boolean,
        required: true,
    }
    // user_image: {
    //     type: mongoose.Schema.Types.Mixed
    // },
    // Security_questions_01: {
    //     type: String,
    // },
    // Security_questions_02: {
    //     type: String,
    // },
    // Security_questions_03: {
    //     type: String,
    // },
    // Secret_answers: {
    //     type: String,
    // },
    // DOB: {
    //     type: String
    // },
    // GST: {
    //     type: String
    // }
}, {
    timestamps: true,
});

// generating jwt token
userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET_KEY, { expiresIn: "30d" });
    return token;
}

module.exports = mongoose.model("User", userSchema);

