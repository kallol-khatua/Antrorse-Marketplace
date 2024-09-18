const express = require("express");
const router = express.Router();
const auth = require("../app/middleware/auth")
const orderController = require("../app/controlllers/orderController");

router.post("/newOrder", auth.authorization, orderController.newOrder);
router.get("/:id", auth.authorization, orderController.getSingleOrderDetails);
router.get("/myOrders",  orderController.myOrders)

// router.route('/admin/').get(, authorizeRoles("admin"), getAllOrders);
// router.route('/admin/order/:id').put( authorizeRoles("admin"), updateOrder)
    // .delete( authorizeRoles("admin"), deleteOrder);
    router.get("/orderHistory",auth.authorization,orderController.orderHistory)

module.exports = router;