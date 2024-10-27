const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sellerPickupLocationSchema = new Schema({
    seller_id: {
        type: Schema.Types.ObjectId,
        ref: "Seller",
        required: true
    },
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    postcode: {
        type: Number,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    contact_number: {
        type: Number,
        required: true
    },
})

const SellerPickupLocation = mongoose.model("SellerPickupLocation", sellerPickupLocationSchema);

module.exports = SellerPickupLocation;