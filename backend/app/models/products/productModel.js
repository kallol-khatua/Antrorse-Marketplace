const mongoose = require("mongoose");
const { Schema } = mongoose;
const productSchema = new Schema({
  seller_id: {
    type: Schema.Types.ObjectId,
    ref: "seller",
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    default: 0,
  },
  stock: {
    type: Number,
    required: true,
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
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
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
});
module.exports = mongoose.model("product", productSchema);
