const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const variantSchema = new Schema({
    // ================ Common for all ================ //
    product_id: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },

    actual_price: {
        type: Number,
    },
    offered_price: {
        type: Number,
    },

    min_order_quantity: {
        type: Number,
    },
    // ================ Common for all ================ //

    // ================ Foods & Beverages ================ //
    quantity_type: {
        type: String,
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
    country_of_origin: {
        type: String,
    },

    packaging_type: {
        type: String,
    },
    brand_name: {
        type: String
    },
    storage_conditions: {
        type: String,
    },
    // ================ Foods & Beverages ================ //

    // ================ Clothing ================ //

    // ================ Clothing ================ //
}, { timestamps: true });

const Variant = mongoose.model("Variant", variantSchema);

module.exports = Variant;