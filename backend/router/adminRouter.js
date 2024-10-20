const express = require("express")
const route = express.Router()
const adminController = require("../app/controlllers/adminController");
const Admin = require("../app/models/admin/admin");
const jwt = require("jsonwebtoken")

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

route.post("/login", adminController.login)
route.get("/totalUser", adminController.totalUser)
route.get("/totalSeller", adminController.totalSeller)
route.get("/totalOrder", adminController.totalOrder)
route.get("/due-authorization-seller", adminController.dueAuthorizationSeller)
route.post("/approve-seller", verifyAdminAuthToken, adminController.approveSeller)
route.post("/reject-seller", verifyAdminAuthToken, adminController.rejectSeller)
route.get("/approve-seller-product", verifyAdminAuthToken, adminController.getProductForApproval);

module.exports = route