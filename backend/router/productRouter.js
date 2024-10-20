const express = require("express")
const route = express.Router()
const auth = require("../app/middleware/auth")
const productController = require("../app/controlllers/productController")
const jwt = require("jsonwebtoken");
const Seller = require("../app/models/seller/sellerModels");
const Admin = require("../app/models/admin/admin");


// Middleware to verify seller auth JWT tooken
const verifySellerAuthToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) return res.status(401).send({ success: false, message: "Access Denied: No token provided!", error: "Unauthorized" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        let seller = await Seller.findOne({ _id: decoded._id });
        if (!seller) {
            return res.status(403).send({ success: false, message: "You are not a registered seller.", error: "Forbidden" });
        }
        req.seller = seller

        next();
    } catch (error) {
        console.log(error)
        return res.status(401).json({ success: false, message: 'Invalid Token.', error: "Unauthorized" });
    }
};

// Middleware to verify admin auth JWT tooken
const verifyAdminAuthToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) return res.status(401).send({ success: false, message: "Access Denied: No token provided!", error: "Unauthorized" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        let admin = await Admin.findOne({ _id: decoded._id });
        if (!admin) {
            return res.status(403).send({ success: false, message: "You are not a registered admin.", error: "Forbidden" });
        }
        req.admin = admin

        next();
    } catch (error) {
        console.log(error)
        return res.status(401).json({ success: false, message: 'Invalid Token.', error: "Unauthorized" });
    }
}

// seller
route.post("/seller/add-product/foods-and-beverages", verifySellerAuthToken, productController.addFoodsAndBeveragesProduct);
route.post("/seller/add-product/clothings", verifySellerAuthToken, productController.addClothingsProduct);
route.post("/seller/add-product/defaults", verifySellerAuthToken, productController.addDefaultProduct);

// Admin
route.post("/admin/add-product/clothings", verifyAdminAuthToken, productController.addClothingsAdminProduct);
route.post("/admin/add-product/foods-and-beverages", verifyAdminAuthToken, productController.addFoodsAndBeveragesAdminProduct);
route.post("/admin/add-product/defaults", verifyAdminAuthToken, productController.addDefaultAdminProduct);

route.get("/searchProducts", productController.searchProducts)
route.get("/getProductById/:product_id", productController.getProductById)
route.get("/getAllProductBySellerId", productController.getAllProductBySellerId)
route.get("/getProductBySubcategory", productController.getProductBySubcategory)
route.put("/updateProduct/:product_id", auth.sellerAuth, productController.updateProduct)
route.get("/getProductByIdWithRating/:product_id", productController.getProductByIdWithRating)

// ===========productRating========

// Create a new review and rating
route.post("/review-ratings", auth.authorization, productController.addReviewRating);

// Get all reviews and ratings
route.get("/review-ratings", productController.getAllReviewRatings);

// Get a specific review and rating by ID
route.get("/review-ratings/:product_id", productController.getReviewRatingByProductId);

// Update a review and rating by ID
route.put("/review-ratings/:reviewRating_id", productController.updateReviewRatingById);

// Delete a review and rating by ID
route.delete("/review-ratings/:reviewRating_id", productController.deleteReviewRatingById);



module.exports = route