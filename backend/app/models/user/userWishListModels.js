const mongoose = require('mongoose');
// Define Wishlist Schema
const wishlistSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
    },
  ],
},{timestamps:true});
// Create Wishlist model
module.exports = mongoose.model('Wishlist', wishlistSchema);