const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
  country: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  pinCode: {
    type: Number,
    required: true,
  },
  area: {
    type: String,
  },
  house: {
    type: String,
  },
  landMark:{
    type:String
  },
  phone_number:{
    type:String,
require:true
  },
  alternate_phone_number:{
    type:String
  }
},{timestamps:true});

module.exports = mongoose.model('Address', addressSchema);