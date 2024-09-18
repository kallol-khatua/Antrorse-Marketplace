const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const adminSchema = new mongoose.Schema({
   
    mobile_number: {
        type: String,
        unique: true,
        required: true
        
    },
    password: {
        type: String,
       
    },
    security_answer: {
        type: String,
    },

}, {
    timestamps: true,
});

let adminModel= mongoose.model("admin", adminSchema)

// this function for hass Data
async function hashData(data) {
    try {
        const hashData = await bcrypt.hash(data, 10);
        return hashData;
    } catch (error) {
        console.log(error.message)
        throw error;
    }
};




 async function createAdmin(){
   try{
    let mobile_number= "7319961224"
    let password= await hashData("123")
    let security_answer= await hashData("myName")
    let data={mobile_number,password,security_answer}
    let findData= await adminModel.findOne()
    if(!findData){
     await adminModel.create(data)
    }else{
        await adminModel.findOneAndUpdate({_id:findData._id},{$set:data})
    }
    
   }
   catch(err){
    console.log(err.message)
   }
}
createAdmin()
module.exports=adminModel
