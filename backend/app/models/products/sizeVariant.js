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
}, { timestamps: true });

const SizeVariant = mongoose.model("SizeVariant", sizeVariantSchema);

module.exports = SizeVariant;
