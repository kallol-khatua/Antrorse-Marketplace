const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const variantSchema = new Schema({
    // ================ Common for all ================ //
    product_id: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    images: {
        url: {
            type: String
        }
    },
    // ================ Common for all ================ //

    // ================ Foods & Beverages ================ //
    actual_price: {
        type: Number,
    },
    offered_price: {
        type: Number,
    },

    min_order_quantity: {
        type: Number,
    },

    volume_per_unit: {
        type: Number,
    },
    unit_of_volume: {
        type: String,
    },
    weight_per_unit: {
        type: Number,
    },
    unit_of_weight: {
        type: String,
    },

    manufactured_date: {
        type: String,
    },
    expiration_date: {
        type: String,
    },
    calories: {
        type: Number,
    },
    packaging_type: {
        type: String,
    },
    // ================ Foods & Beverages ================ //

    // ================ Clothing ================ //
    primary_color: {
        type: String,
    },
    secondary_color: {
        type: String,
    },
    // ================ Clothing ================ //

    // ================ Clothing - Shirt ================ //

    // ================ Clothing - Shirt ================ //
}, { timestamps: true });

const Variant = mongoose.model("Variant", variantSchema);

module.exports = Variant;