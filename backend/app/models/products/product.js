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

  unit_of_measurement: { // piece
    type: String,
  },

  generic_name: {
    type: String,
    // enum: ['Shirt', 'T Shirt'],
  },
  pack_of: {
    type: Number,
    // enum: [1, 2, 3, 4, 5],
  },
  quantity_type: {
    type: String,
  },
  model_name: {
    type: String
  },
  type: {
    type: String
  },
  brand_name: {
    type: String
  },
  country_of_origin: {
    type: String,
  },
  storage_conditions: {
    type: String,
  },
  inventory_location: {
    type: String
  },

  specifications: {
    type: String
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
  ideal_for: {
    type: String,
    enum: ['Men', 'Women', "Boys", "Girls"],
  },
  fit: {
    type: String,
  },
  fabric: {
    type: String,
  },
  fabric_care: {
    type: String,
  },
  suitable_for: {
    type: String,
  },
  is_returnable: {
    type: Boolean,
  },
  return_within_days: {
    type: Number,
  },
  returnable_condition: {
    type: String
  },
  min_order_quantity: {
    type: Number,
  },
  // ================ Clothing ================ //

  // ================ Clothing - Shirt and T Shirt - Common ================ //
  sleeve: {
    type: String,
  },
  pattern: {
    type: String,
  },
  reversible: {
    type: String,
    enum: ['No', 'Yes'],
  },

  // ================ Clothing - Shirt and T Shirt - Common ================ //

  // ================ Clothing - Shirt ================ //
  closure: {
    type: String,
  },
  collar: {
    type: String,
  },
  hem: {
    type: String,
  },
  // ================ Clothing - Shirt ================ //

  // ================ Clothing - T Shirt ================ //
  neck_type: {
    type: String,
  },
  // ================ Clothing - T Shirt ================ //
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);

module.exports = Product;