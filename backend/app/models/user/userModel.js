const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    user_name: {
        type: String,
        required:true, // Name is required
    },
    email:{
        type: String,
      
     
    },
    mobile_number: {
        type: Number,
        unique: true,
        required: true
        
    },
    password: {
        type: String,
       
    },
    user_image:{
        type:mongoose.Schema.Types.Mixed
    },
    Security_questions_01: {
        type: String,
    },
    Security_questions_02: {
        type: String,
    },
    Security_questions_03: {
        type: String,
    },
    Secret_answers: {
        type: String,
    },
    DOB:{
        type:String
    },
    GST:{
        type:String
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model("user", userSchema);
