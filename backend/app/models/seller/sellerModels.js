const mongoose = require("mongoose");
const jwt = require("jsonwebtoken")

const sellerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    mobile_number: {
        type: Number,
        unique: true,
        required: true,
    },
    isMobileNumberVerified: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        required: true,
    },
    isAcceptTermsAndConditions: {
        type: Boolean,
        required: true,
    },
    gst_number: {
        type: String,
        // required: true,
        unique: true,
        trim: true
    },
    company_name: {
        type: String,
        required: true,
    },
    pin_code: {
        type: Number,
    },

    // company_pan_number: {
    //     type: String
    // },
    // DOB: {
    //     type: String,
    // },
    // security_questions: {
    //     type: String,
    // },
    // secret_answers: {
    //     type: String,
    // },
    // account_details: {
    //     account_Number: { type: Number },
    //     account_holder_name: { type: Number },
    //     IFC_code: { type: String }
    // },
    // company_tan_number: {
    //     type: String
    // },
    // aadhar_number: {
    //     type: String
    // },
    // aadhar_image: {
    //     type: String
    // },
    account_status: {
        type: String,
        enum: ["PENDING", "ACTIVE", "REJECTED"],
        default: "PENDING"
    },
    isActive: {
        type: Boolean,
        default: false
    },
    isApproved: {
        type: Boolean,
        default: false
    },
    isRejected: {
        type: Boolean,
        default: false
    },
    isAppliedForApproval: {
        type: Boolean,
        default: false
    },

    isPickUpLocationAdded: {
        type: Boolean,
        default: false
    },
    pickup_id: {
        type: Number
    },
    rto_address_id: {
        type: Number
    },
    pickup_location: {
        type: String
    },
    is_pickup_location_verified: {
        type: Boolean,
        default: false
    },

    is_aadhaar_card_added: {
        type: Boolean,
        default: false,
    },
    is_pan_card_added: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true, });

// generating jwt token
sellerSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET_KEY, { expiresIn: "30d" });
    return token;
}

const Seller = mongoose.model("Seller", sellerSchema);

module.exports = Seller;