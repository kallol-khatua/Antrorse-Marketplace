const mongoose = require("mongoose");
const { Schema } = mongoose;
const productSchema = new Schema({
  seller_id: {
    type: Schema.Types.ObjectId,
    ref: "seller",
  },
  product_name: {
    type: String,
    required: true,
  },
  product_description: {
    type: String,
    required: true,
  },
  actual_price: {
    type: Number,
    required: true,
  },
  offered_price: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    default: 0,
  },

  available_stock: {
    type: Number,
    required: true,
  },
  ordered_stock: {
    type: Number,
    default: 0
  },
  in_transit_stock: {
    type: Number,
    default: 0
  },
  delivered_stock: {
    type: Number,
    default: 0
  },

  dimensions: {
    length: {
      type: Number,
    },
    breath: {
      type: Number,
    },
    height: {
      type: Number,
    },
    weight: {
      type: Number,
    },
  },
  tags: {
    type: [],
    default: [],
  },
  category: {
    type: String,
    enum: [
      "Male",
      "Female",
      "Kids",
      "Footwear",
      "electronics",
      "mobile",
      "laptop",
    ],
  },
  subCategory: {
    type: String,
  },
  images: {
    type: [String],
    default: [],
  },
  variations: {
    category_selection: {
      type: String,
    },
    brand_name: {
      type: String,
    },
    material: {
      // this is replace with
      type: [String],
      default: [],
    },
    sizes: [{}],
    color: {
      type: [String],
      default: [],
    },
    // ============
    camera_pixel: String,
    screen_size: String,
    model_number: String,
    warranty: String,
  },
}, { timestamps: true, });

module.exports = mongoose.model("product", productSchema);
