const express = require("express")
const route = express.Router()
const sellerController = require("../app/controlllers/sellerController")
const auth = require("../app/middleware/auth")
const jwt = require("jsonwebtoken");
const Seller = require("../app/models/seller/sellerModels");

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

route.post("/sellerRegistration", sellerController.sellerRegistration)
route.post("/sellerLogin", sellerController.sellerLogin)

route.post("/create-pickup-location", verifySellerAuthToken, sellerController.createPickupLocation)

route.get("/get-all-orders/generate-invoice", verifySellerAuthToken, sellerController.getAllOrders);
route.post("/get-all-orders/generate-awb", verifySellerAuthToken, sellerController.generateAwb)

route.post("/sendOtpForRegistration", sellerController.sendOtpForRegistration)
route.put("/updateProfile", auth.authorization, sellerController.updateProfile)
route.put("/forgetPassword", sellerController.forgetPassword)
route.put("/sellerKYC", auth.sellerAuth, sellerController.sellerKYC)

route.post("/createOTPForForgetPassword", sellerController.createOTPForForgetPassword)
module.exports = route