const mongoose = require("mongoose");
let ObjectId = mongoose.Schema.Types.ObjectId;

const orderSchema = new mongoose.Schema(
  {
    user_id: { type: ObjectId, ref: "user", required: true },
    shippingInfo: {
      type: String,
      enum: ["home", "work"],
      required: true,
    },
    address_id: {
      type: ObjectId,
      ref: "Address",
      required: true,
    },
    orderItems: [
      {
        product_name: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        sizes: [
          {}
        ],

        product_id: {
          type: ObjectId,
          ref: "Product",
          required: true,
        },
        color:mongoose.Schema.Types.Mixed
      },
    ],
    totalPrice: { type: Number, required: true, default: 0 },
    totalItems: { type: Number, required: true },
    totalQuantity: { type: Number, required: true },
    
  transactionId: String,
  
  
    paidAt: {
      type: Date,
    },

    orderStatus: {
      type: String,
      default: "pending",
      enum: ["pending", "completed", "canceled"],
    },
    deliveredAt: Date,
    shippedAt: Date,
    createdAt: {
      type: Date,
      default: Date.now,
    },
    deletedAt: { type: Date, default: null },
    orderId: {
      type: String,
    },
    order_processing: {
      type: Boolean,
      default: false,
    },
    shipped: {
      type: Boolean,
      default: false,
    },
    inTransit: {
      type: Boolean,
      default: false,
    },
    outForDelivery: {
      type: Boolean,
      default: false,
    },
    delivered: {
      type: Boolean,
      default: false,
    },
    refunded: {
      type: Boolean,
      default: false,
    },
    channel_id: {
      type: String,
    },

    pickup_location: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
