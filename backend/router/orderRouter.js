const express = require("express");
const router = express.Router();
const auth = require("../app/middleware/auth")
const orderController = require("../app/controlllers/orderController");
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

router.post("/newOrder", auth.authorization, orderController.newOrder);
router.get("/:id", auth.authorization, orderController.getSingleOrderDetails);
router.get("/myOrders", orderController.myOrders)

router.post("/place-order/clothing", verifyUserAuthToken, orderController.placeClothingOrder);
router.post("/place-order/clothing/payment-success", verifyUserAuthToken, orderController.paymentSuccess);

router.post("/place-order/default/cod", verifyUserAuthToken, orderController.placeDefaultCodOrder);

// router.route('/admin/').get(, authorizeRoles("admin"), getAllOrders);
// router.route('/admin/order/:id').put( authorizeRoles("admin"), updateOrder)
// .delete( authorizeRoles("admin"), deleteOrder);
router.get("/orderHistory", auth.authorization, orderController.orderHistory)

module.exports = router;