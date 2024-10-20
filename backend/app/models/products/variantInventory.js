const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const inventorySchema = new Schema({
    product_variant_id: {
        type: Schema.Types.ObjectId,
        ref: "Variant",
        required: true
    },

    available_quantity: {
        type: Number,
        required: true,
    },
    ordered_quantity: {
        type: Number,
        default: 0
    },
    in_transit_quantity: {
        type: Number,
        default: 0
    },
    delivered_quantity: {
        type: Number,
        default: 0
    },
    // min_quantity: {
    //     type: Number,
    // },

    // inventory_location: {
    //     type: String
    // }
}, { timestamps: true });

const VariantInventory = mongoose.model("VariantInventory", inventorySchema);

module.exports = VariantInventory;