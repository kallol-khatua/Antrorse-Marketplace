const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderItemSchema = new Schema(
    {
        order_id: {
            type: Schema.Types.ObjectId,
            ref: 'Order',
            required: true,
        },
        short_order_id: {
            type: Number,
            required: true,
            unique: true,
        },
        invoice_id: {
            type: Number,
            unique: true,
        },

        // Charge information
        price: {
            type: Number,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        subTotalPrice: {
            type: Number,
            required: true,
        },
        deliveryCharge: {
            type: Number,
            require: true
        },
        totalAmount: {
            type: Number,
            required: true,
        },

        // payment information
        is_cod: {
            type: Number,
            default: 0
        },
        is_payment_success: {
            type: Boolean,
            default: false
        },
        order_payment_type: {
            type: String,

        },
        transactionId: {
            type: String,
        },
        paidAt: {
            type: Date,
        },

        // Product information
        product_id: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        variant_id: {
            type: Schema.Types.ObjectId,
            ref: "Variant",
            required: true,
        },
        // clothing products
        sizeVariantId: {
            type: Schema.Types.ObjectId,
            ref: "SizeVariant",
        },


        // order details
        orderStatus: {
            type: String,
            default: "pending",
            enum: ["pending", "completed", "canceled", "returned"],
        },

        is_canceled: {
            type: Boolean,
            default: false
        },
        canceledAt: {
            type: Date,
        },

        is_awb_generated: {
            type: Boolean,
            default: false
        },
        awb_generated_at: {
            type: Date,
        },
        is_order_processeing: {
            type: Boolean,
            default: false,
        },

        is_order_packed: {
            type: Boolean,
            default: false,
        },
        order_packed_at: {
            type: Date,
        },

        is_shipped: {
            type: Boolean,
            default: false,
        },
        shipped_at: {
            type: Date,
        },
        is_inTransit: {
            type: Boolean,
            default: false,
        },
        is_outForDelivery: {
            type: Boolean,
            default: false,
        },
        is_delivered: {
            type: Boolean,
            default: false,
        },
        delivered_at: {
            type: Date,
        },
        is_returned: {
            type: Boolean,
            default: false,
        },
        is_refunded: {
            type: Boolean,
            default: false,
        },
    }, { timestamps: true });

const OrderItem = mongoose.model("OrderItem", orderItemSchema);

module.exports = OrderItem;
