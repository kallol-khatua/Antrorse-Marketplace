const express = require("express");
const {
  createNewPayment,
  checkStatus,
} = require("../app/controlllers/phonepeController");
const router = express.Router();

router.post("/phonepe/payment", createNewPayment);
// router.post("/status/:transactionId", checkStatus);
// router.get("/status/:transactionId", checkStatus);
router.get("/payment/validate/:transactionId", checkStatus);

module.exports = router;
