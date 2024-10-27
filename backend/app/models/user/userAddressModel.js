const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const addressSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true
  },

  name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  phone_number: {
    type: Number,
    require: true
  },
  pincode: {
    type: Number,
    required: true,
  },
  email: {
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
  address: {
    type: String,
    required: true,
  },
  address_2: {
    type: String,
  },
  country: {
    type: String,
    required: true,
  },
  landMark: {
    type: String
  },

  // alternate_phone_number: {
  //   type: String
  // }
}, { timestamps: true });

const Address = mongoose.model("Address", addressSchema);

module.exports = Address;