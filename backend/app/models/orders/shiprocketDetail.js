const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const shiprocketDetailSchema = new Schema(
    {
        order_item_id: {
            type: Schema.Types.ObjectId,
            ref: 'OrderItem',
            required: true,
        },
        courier_id: {
            type: Number
        },
        order_id: {
            type: Number
        },
        channel_order_id: { // same as provided order id of the order
            type: String
        },
        shipment_id: {
            type: Number
        },
        onboarding_completed_now: {
            type: Number
        },
        awb_code: {
            type: String
        },
        courier_company_id: {
            type: String,
        },
        courier_name: {
            type: String
        },
        packaging_box_error: {
            type: String
        }
    }, { timestamps: true });

const ShiprocketDetail = mongoose.model("ShiprocketDetail", shiprocketDetailSchema);

module.exports = ShiprocketDetail;
