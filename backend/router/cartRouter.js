const express = require("express")
const route = express.Router()
const cartController = require("../app/controlllers/cartController")
const auth = require("../app/middleware/auth")
const jwt = require("jsonwebtoken");
const userModel = require("../app/models/user/userModel");

// Middleware to verify seller auth JWT tooken
const verifyUserAuthToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) return res.status(401).send({ success: false, message: "Access Denied: No token provided!", error: "Unauthorized" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        let user = await userModel.findOne({ _id: decoded._id });
        if (!user) {
            return res.status(403).send({ success: false, message: "You are not a registered user.", error: "Forbidden" });
        }
        req.user = user

        next();
    } catch (error) {
        console.log(error)
        return res.status(401).json({ success: false, message: 'Invalid Token.', error: "Unauthorized" });
    }
};

route.post("/createCart", verifyUserAuthToken, cartController.createCart)
route.get("/get-cart-items", verifyUserAuthToken, cartController.getCartData)
route.put("/removeItemsToCart/:product_id", auth.authorization, cartController.removeItemsToCart)
route.delete("/removeCart/:cart_id", auth.authorization, cartController.removeCart)


module.exports = route