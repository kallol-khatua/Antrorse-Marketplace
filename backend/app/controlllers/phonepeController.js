const crypto = require("crypto");
const axios = require("axios");
require("dotenv").config();
const sha256 = require("sha256");

let orderDetails = "";

const createNewPayment = async (req, res) => {
  orderDetails = req.body.message;
  const data = {
    merchantId: process.env.MERCHANT_ID,
    merchantUserId: req.body.merchantUserId,
    merchantTransactionId: req.body.transactionId,
    buyerName: req.body.buyerName,
    amount: req.body.amount,
    // redirectUrl: `${process.env.REDIRECT_URL}/api/status/${req.body.transactionId}`,
    redirectUrl: `${process.env.REDIRECT_URL}/payment/validate/${req.body.transactionId}`,
    redirectMode: "REDIRECT",
    paymentInstrument: {
      type: "PAY_PAGE",
    },
  };

  let bufferObj = Buffer.from(JSON.stringify(data), "utf8");
  let payload = bufferObj.toString("base64");

  let string = payload + "/pg/v1/pay" + process.env.SALT_KEYS;
  let sha256_val = sha256(string);
  let checksum = sha256_val + "###" + process.env.SALT_KEYS_INDEX;

  const options = {
    url: process.env.PHONEPE_TEST_URL,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-VERIFY": checksum,
    },
    data: {
      request: payload,
    },
  };

  try {
    const response = await axios.post(options.url, options.data, {
      headers: options.headers,
    });

    console.log(response.data, "response.data in create new payment");
    console.log(orderDetails,"orderDetailsinCreate")
    const data = response.data.data.instrumentResponse.redirectInfo.url;

    return res.json({ statusCode: 200, redirectURL: data, message: "success" });
  } catch (error) {
    return res.json({ statusCode: 500, message: error.message });
  }
};

const checkStatus = async (req, res) => {
  const merchantId = process.env.MERCHANT_ID;
  const transactionId = req.params.transactionId;
  const string = `/pg/v1/status/${merchantId}/${transactionId}${process.env.SALT_KEYS}`;

  let sha256_val = sha256(string);
  let checksum = sha256_val + "###" + process.env.SALT_KEYS_INDEX;

  const options = {
    url: `${process.env.PHONEPE_TEST_STATUS_URL}/status/${merchantId}/${transactionId}`,
    headers: {
      "Content-Type": "application/json",
      "X-VERIFY": checksum,
      "X-MERCHANT-ID": merchantId,
      accept: "application/json",
    },
  };

  axios
    .get(options.url, {
      headers: options.headers,
    })
    .then(function (response) {
      if (response.data && response.data.code === "PAYMENT_SUCCESS") {
        
         console.log(response.data, "response.data in status");
        res.send(response.data);
      } else {
        res.send(response);
      }
    })
    .catch(function (error) {
      res.send(error);
    });
};

module.exports = {
  createNewPayment,
  checkStatus,
};