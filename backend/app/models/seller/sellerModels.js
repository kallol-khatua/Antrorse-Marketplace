const mongoose = require("mongoose");
const sellerSchema = new mongoose.Schema({
    fullName:
    {
        type: String,
        required: true,
        trim: true
    },
    mobile_number: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    email_id: {
        type: String,
        unique: true,
        trim: true
    },
    GST: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    company_pan_number: {
        type: String
    },
    password: {
        type: String,
    },
    DOB: {
        type: String,
    },
    security_questions: {
        type: String,
    },
    secret_answers: {
        type: String,
    },
    account_details: {
        account_Number:{type:Number},
        account_holder_name:{type:Number},
        IFC_code:{type:String}

    },
    company_tan_number:{
        type:String
    },
    aadhar_number:{
        type:String
    },
    aadhar_image:{
        type:String
    },
    status:{
        type:String,
        enum:["pending","active","rejected"]
    }
    
},{timestamps: true,});
module.exports = mongoose.model("seller", sellerSchema);