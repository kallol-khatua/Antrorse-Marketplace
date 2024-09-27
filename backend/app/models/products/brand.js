const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const brandSchema = new Schema({
    category_name: {
        type: String,
        required: true
    },
    description: {
        type: String
    }
}, { timestamps: true });

const Brand = mongoose.model("Brand", brandSchema);

module.exports = Brand;