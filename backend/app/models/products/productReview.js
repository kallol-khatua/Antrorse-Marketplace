const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const productRatingSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
    },
    review: {
      type: String,
    },
    user_id: {
      type: ObjectId,
      ref: "user",
    },
    product_id: {
      type: ObjectId,
      ref: "product",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("productreview", productRatingSchema);
