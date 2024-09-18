const mongoose = require('mongoose');

const sellerAddressSchema = new mongoose.Schema({
    seller_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"seller",
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
  tehsil:{
type:String
  },
  mouza:{
    type:String

  },
  plot_Number:{
    type:String

  },
  policeStation:{
    type:String,
  },
  phone_number:{
    type:String,
require:true
  },
  alternate_phone_number:{
    type:String
  }
},{timestamps:true});

module.exports = mongoose.model('sellerAddress', sellerAddressSchema);