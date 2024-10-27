const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    // delivery address
    delivery_address_id: {
      type: Schema.Types.ObjectId,
      ref: "Address",
      required: true,
    },
    delivery_customer_name: {
      type: String,
      required: true
    },
    delivery_custome_last_name: {
      type: String,
      required: true
    },
    delivery_address: {
      type: String,
      required: true
    },
    delivery_address_2: {
      type: String
    },
    delivery_city: {
      type: String,
      required: true
    },
    delivery_pincode: {
      type: Number,
      required: true
    },
    delivery_state: {
      type: String,
      required: true
    },
    delivery_country: {
      type: String,
      required: true
    },
    delivery_email: {
      type: String,
      required: true
    },
    delivery_phone: {
      type: Number,
      required: true
    },
    delivery_landmark: {
      type: String,
    },


    // Charge information
    totalItems: {
      type: Number,
      required: true
    },
    totalQuantity: {
      type: Number,
      required: true
    },
    subTotalPrice: {
      type: Number,
      required: true
    },
    deliveryCharge: {
      type: Number,
      require: true
    },
    totalAmount: {
      type: Number,
      required: true
    },

    // order details
    is_order_placed: {
      type: Boolean,
      default: false
    },
    orderPlacedAt: {
      type: Date,
    },

    // payment information - usefull for multiple product
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
      type: String
    },
    paidAt: {
      type: Date,
    },
  }, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
