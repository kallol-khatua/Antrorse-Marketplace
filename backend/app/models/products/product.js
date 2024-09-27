const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  // ================ Common for all ================ //
  product_name: {
    type: String,
    required: true
  },
  product_description: {
    type: String,
    required: true
  },
  product_type: { // Foods and Beverages/ Clothings/ Footwears
    type: String,
    required: true
  },
  category_id: [
    {
      type: Schema.Types.ObjectId,
      ref: "Category",
    }
  ],

  unit_of_measurement: { // piece
    type: String,
    required: true
  },

  image: {
    url: {
      type: String
    }
  },
  tags: {
    type: [String],
    default: []
  },
  brand_id: {
    type: Schema.Types.ObjectId,
    ref: "Brand",
  },
  seller_id: {
    type: Schema.Types.ObjectId,
    ref: "Seller",
  },

  is_admin_product: {
    type: Boolean,
    default: false
  },
  admin_id: {
    type: Schema.Types.ObjectId,
    ref: "Admin",
  },
  barcode: {
    type: String,
    // required: true
  },
  // ================ Common for all ================ //


  // ================ Clothing ================ //
  generic_name: {
    type: String
  },
  pack_of: {
    type: Number
  },
  // ================ Clothing ================ //

  // ================ Clothing - Shirt ================ //
  closure: {
    type: String,
  },
  fit: {
    type: String,
  },
  fabric: {
    type: String,
  },
  sleeve: {
    type: String,
  },
  pattern: {
    type: String,
  },
  collar: {
    type: String,
  },
  fabric_care: {
    type: String,
  },
  suitable_for: {
    type: String,
  },
  reversible: {
    type: String, // No / Yes
    // enum
  },
  hem: {
    type: String,
  },
  country_of_origin: {
    type: String,
  },
  ideal_for: {
    type: String,
  },

  // ================ Clothing - Shirt ================ //
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);

module.exports = Product;