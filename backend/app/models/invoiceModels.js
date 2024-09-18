const { default: mongoose } = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId

const invoiceSchema = new mongoose.Schema({
    orderId: ObjectId,
    invoiceNumber: String,
    userName: String,
    userPhone: String,
    userEmail: String,
    userAddress: String,
    sellerName: String,
    sellerPhone: String,
    sellerEmail: String,
    storeName: String,
    storeAddress: String,
    orderItems: [{
        Product: String,
        Description: String,
        Rate: Number,
        QTY: Number,
        Amount: Number
    }],
    SubTotal: Number,
    Tax: Number,
    Total: Number
});

module.exports = mongoose.model( 'Invoice', invoiceSchema)
