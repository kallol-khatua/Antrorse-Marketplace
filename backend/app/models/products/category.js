const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    category_name: {
        type: String,
        required: true
    },
    description: {
        type: String
    }
}, { timestamps: true });

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;