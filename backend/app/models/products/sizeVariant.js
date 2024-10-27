const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sizeVariantSchema = new Schema({
    product_variant_id: {
        type: Schema.Types.ObjectId,
        ref: "Variant",
        required: true
    },
    size: {
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
    length: {  // Length in cm
        type: Number,
        required: true,
    },
    breadth: {  // Breadth in cm
        type: Number,
        required: true,
    },
    height: {  // Height in cm
        type: Number,
        required: true,
    },
    weight: { // Weight in kg
        type: Number,
        required: true,
    },
    sku: {
        type: String,
    },
    hsn: {
        type: Number
    }
}, { timestamps: true });

const SizeVariant = mongoose.model("SizeVariant", sizeVariantSchema);

module.exports = SizeVariant;
