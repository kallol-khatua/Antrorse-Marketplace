const express = require("express")
const router = express.Router()
const userController = require("../app/controlllers/userController")
const wishlistController = require("../app/controlllers/wishListController")
const auth = require("../app/middleware/auth")
const jwt = require("jsonwebtoken")
const userModel = require("../app/models/user/userModel")

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

router.post("/register", userController.register)
router.post("/sendOtpForRegistration", userController.sendOtpForRegistration)
router.post("/login", userController.login)
router.post("/loginWithOTP", userController.loginWithOTP)
router.put("/updateProfile", auth.authorization, userController.updateProfile)
router.put("/forgetPassword", userController.forgetPassword)
router.delete("/userDeleteProfile", auth.authorization, userController.userDeleteProfile)
router.get("/getUser", auth.authorization, userController.getUser)
// ===================== this use according to use=============
router.post("/createOTPForForgetPassword", userController.createOTPForForgetPassword)

// ======================================================================
router.post("/create-address", verifyUserAuthToken, userController.createAddress)
router.get("/getAddress", verifyUserAuthToken, userController.getAddress)

// ================wishList=============
router.post("/createWishList", auth.authorization, wishlistController.createWishList)
router.get("/getWishList", auth.authorization, wishlistController.getWishList)
router.put("/removeFromWishlist/:product_id", auth.authorization, wishlistController.removeFromWishlist)

router.get("/get-all-orders", verifyUserAuthToken, userController.getAllorders)

// ==============
module.exports = router