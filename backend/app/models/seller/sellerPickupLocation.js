const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sellerPickupLocationSchema = new Schema({
    seller_id: {
        type: Schema.Types.ObjectId,
        ref: "Seller",
        required: true
    },
    pickup_location: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    address_2: {
        type: String,
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    pin_code: {
        type: Number,
        required: true
    },
})

const SellerPickupLocation = mongoose.model("SellerPickupLocation", sellerPickupLocationSchema);

module.exports = SellerPickupLocation;