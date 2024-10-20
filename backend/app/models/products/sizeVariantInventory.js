const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sizeVariantInventorySchema = new Schema({
    size_variant_id: {
        type: Schema.Types.ObjectId,
        ref: "SizeVariant",
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
    // min_quantity: {   // to inform seller for low stock
    //     type: Number,
    // },
}, { timestamps: true });

const SizeVariantInventory = mongoose.model("SizeVariantInventory", sizeVariantInventorySchema);

module.exports = SizeVariantInventory;