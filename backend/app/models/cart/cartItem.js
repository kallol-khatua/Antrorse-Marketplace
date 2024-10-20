const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartItemSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    product_type: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    product_id: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    variant_id: {
        type: Schema.Types.ObjectId,
        ref: 'Variant',
        required: true,
    },
    is_removed_from_cart: {
        type: Boolean,
        default: false
    },


    // Clothing
    size_variant_id: {
        type: Schema.Types.ObjectId,
        ref: 'SizeVariant',
    },
    size: {
        type: String,
    },
}, { timestamps: true });

const CartItem = mongoose.model("CartItem", cartItemSchema);

module.exports = CartItem;
