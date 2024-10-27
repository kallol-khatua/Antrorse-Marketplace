const userModel = require("../models/user/userModel");
const sellerModel = require("../models/seller/sellerModels");
const productModel = require("../models/products/product");
const response = require("../helper/commonResponse");
const { SuccessMessage, ErrorMessage } = require("../helper/message");
const { ErrorCode, SuccessCode } = require("../helper/statusCode");
const commonFunction = require("../helper/commonFunction");
const orderModels = require("../models/orders/orderModels");
const adminModel = require("../models/admin/admin")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

require("dotenv").config()
const userAddressModel = require("../models/user/userAddressModel")
const validation = require("../helper/validation");
const Admin = require("../models/admin/admin");
const OrderItem = require("../models/orders/orderItem");
const { default: mongoose } = require("mongoose");

module.exports.login = async function (req, res) {
  try {
    let data = req.body;
    // console.log(data)

    if (!data.password) {
      return res.status(400).send({ success: false, message: "Password is required" })
    }

    if (!data.mobile_number) {
      return res.status(400).send({ success: false, message: "Mobile number is required" })
    }

    let admin = await Admin.findOne({
      mobile_number: data.mobile_number,
    });
    // console.log(admin)
    if (!admin) {
      return res.status(400).send({ success: false, message: "Invalid mobile number" })
    }

    const matchPass = await bcrypt.compare(data.password, admin.password);
    if (!matchPass) {
      return res.status(400).send({ success: false, message: 'Invalid password.' });
    }

    let authToken = admin.generateAuthToken();

    if (authToken) {
      return res.status(200).send({ success: true, message: "Login successfully", authToken });
    } else {
      return res.status(400).send({ success: false, message: "Error while login" });
    }
  } catch (err) {
    console.log("Error while login user", err);
    return res.status(500).send({ success: false, message: "Internal server error" });
  }
}

module.exports.totalUser = async function (req, res) {
  try {
    let totalUser = await userModel.find();
    if (totalUser.length == 0) {
      totalUser = await userModel.find();
      if (totalUser.length == 0) {
        return response.commonErrorResponse(
          res,
          ErrorCode.NOT_FOUND,
          [],
          ErrorMessage.NOT_FOUND
        );
      }
    } else {
      return response.commonResponse(
        res,
        SuccessCode.SUCCESS,
        totalUser,
        SuccessMessage.DATA_FOUND
      );
    }
  } catch (err) {
    return response.commonErrorResponse(
      res,
      ErrorCode.INTERNAL_ERROR,
      {},
      err.message
    );
  }
}

module.exports.totalSeller = async function (req, res) {
  try {
    let totalSeller = await sellerModel.find();
    if (totalSeller.length == 0) {
      totalSeller = await sellerModel.find();
      if (totalSeller.length == 0) {
        return response.commonErrorResponse(
          res,
          ErrorCode.NOT_FOUND,
          [],
          ErrorMessage.NOT_FOUND
        );
      }
    } else {
      return response.commonResponse(
        res,
        SuccessCode.SUCCESS,
        totalSeller,
        SuccessMessage.DATA_FOUND
      );
    }
  } catch (err) {
    return response.commonErrorResponse(
      res,
      ErrorCode.INTERNAL_ERROR,
      {},
      err.message
    );
  }
}

module.exports.totalProduct = async function (req, res) {
  try {
    let totalProduct = await productModel.find();
    if (totalProduct.length == 0) {
      totalProduct = await productModel.find();
      if (totalProduct.length == 0) {
        return response.commonErrorResponse(
          res,
          ErrorCode.NOT_FOUND,
          [],
          ErrorMessage.NOT_FOUND
        );
      }
    } else {
      return response.commonResponse(
        res,
        SuccessCode.SUCCESS,
        totalProduct,
        SuccessMessage.DATA_FOUND
      );
    }
  } catch (err) {
    return response.commonErrorResponse(
      res,
      ErrorCode.INTERNAL_ERROR,
      {},
      err.message
    );
  }
}

// Total sales worth
module.exports.totalSalesWorth = async function (req, res) {
  try {
    const totalSalesWorth = await orderModel.aggregate([
      {
        $match: {
          orderStatus: "completed",
        },
      },
      {
        $group: {
          _id: null, // grouping all documents together
          totalSales: { $sum: "$totalPrice" }, // calculating the sum of totalPrice field
        },
      },
      {
        $project: {
          _id: 0, // excluding the _id field from the result
          totalSales: 1, // including only the totalSales field in the result
        },
      },
    ]);
  } catch (err) {
    return response.commonErrorResponse(
      res,
      ErrorCode.INTERNAL_ERROR,
      {},
      err.message
    );
  }
}

//  this api for single seller==== total sale worth
module.exports.totalSalesWorthOfSeller = async function () {
  try {
    let seller_id = req.seller_id;
    let totalSale = await orderModels.aggregate([
      {
        $unwind: "$orderItems"
      },
      {
        $lookup: {
          from: "products",
          localField: "orderItems.product_id",
          foreignField: "_id",
          as: productDetails
        }
      }
      , {
        $unwind: "$productDetails"


      },
      {
        $match: {
          "productDetails.seller_id": seller_id
        }
      },
      {
        $addFields: {
          totalPrice: { $sum: "$orderItems.price" }
        }
      }

    ])


  } catch (err) {
    return response.commonErrorResponse(
      res,
      ErrorCode.INTERNAL_ERROR,
      {},
      err.message
    );
  }
}

//   this Api for seller
module.exports.totalProductOfSingleSeller = async function (req, res) {
  try {
    let seller_id = req.seller_id;

    let totalProduct = await productModel.find({ seller_id });
    if (totalProduct.length == 0) {
      totalProduct = await productModel.find({ seller_id });
      if (totalProduct.length == 0) {
        return response.commonErrorResponse(
          res,
          ErrorCode.NOT_FOUND,
          [],
          ErrorMessage.NOT_FOUND
        );
      }
    } else {
      return response.commonResponse(
        res,
        SuccessCode.SUCCESS,
        totalProduct,
        SuccessMessage.DATA_FOUND
      );
    }
  } catch (err) {
    return response.commonErrorResponse(
      res,
      ErrorCode.INTERNAL_ERROR,
      {},
      err.message
    );
  }
}

module.exports.totalOrder = async function (req, res) {
  try {
    let totalOrder = await orderModels.find();
    if (totalOrder.length == 0) {
      totalOrder = await userModel.find();
      if (totalOrder.length == 0) {
        return response.commonErrorResponse(
          res,
          ErrorCode.NOT_FOUND,
          [],
          ErrorMessage.NOT_FOUND
        );
      }
    } else {
      return response.commonResponse(
        res,
        SuccessCode.SUCCESS,
        totalOrder,
        SuccessMessage.DATA_FOUND
      );
    }
  } catch (err) {
    return response.commonErrorResponse(
      res,
      ErrorCode.INTERNAL_ERROR,
      {},
      err.message
    );
  }
}

module.exports.dueAuthorizationSeller = async (req, res) => {
  try {
    const sellers = await sellerModel.find({
      isEmailVerified: true,
      isMobileNumberVerified: true,
      isActive: false,
      isApproved: false,
      isRejected: false
    })
    return res.status(200).send({ success: true, message: "Sellers found", sellers })
  } catch (error) {
    console.log("error while getting due authorization seller", error);
    return res.status(500).send({ success: false, message: "Internal server error" })
  }
}

module.exports.approveSeller = async (req, res) => {
  try {
    const seller = await sellerModel.findOne({ _id: req.body.sellerId })
    if (!seller) {
      return res.status(400).send({ success: false, message: "Seller not found" })
    }

    seller.isActive = true;
    seller.isApproved = true;
    seller.account_status = "ACTIVE";

    await seller.save();

    return res.status(200).send({ success: true, message: "Seller approved successfully" })
  } catch (error) {
    console.log("error while approving seller", error);
    return res.status(500).send({ success: false, message: "Internal server error" })
  }
}

module.exports.rejectSeller = async (req, res) => {
  try {
    const seller = await sellerModel.findOne({ _id: req.body.sellerId })
    if (!seller) {
      return res.status(400).send({ success: false, message: "Seller not found" })
    }

    seller.isRejected = true;
    seller.account_status = "REJECTED";

    await seller.save();

    return res.status(200).send({ success: true, message: "Seller rejected successfully" })
  } catch (error) {
    console.log("error while rejecting seller", error);
    return res.status(500).send({ success: false, message: "Internal server error" })
  }
}

module.exports.getProductForApproval = async (req, res) => {
  try {
    const products = await productModel.find({
      isApproved: false,
      isRejected: false
    })
    return res.status(200).send({ success: true, message: "product found", products });
  } catch (error) {
    console.log("Error while getting products for approval", error);
    return res.status(500).send({ success: false, message: "Internal server error" })
  }
}

module.exports.getOrdersForGenerateAWB = async (req, res) => {
  try {
    const orderItems = await OrderItem.aggregate([
      {
        $lookup: {
          from: 'orders',
          localField: 'order_id',
          foreignField: '_id',
          as: 'orderDetails'
        }
      },
      {
        $unwind: '$orderDetails',
      },
      {
        $lookup: {
          from: 'products',
          localField: 'product_id',
          foreignField: '_id',
          as: 'productDetails'
        }
      },
      {
        $unwind: '$productDetails',
      },
      {
        $match: {
          $and: [
            {
              'is_canceled': false,
            },
            {
              'is_awb_generated': false
            },
            {
              'productDetails.admin_id': new mongoose.Types.ObjectId(req.admin._id)
            },
            {
              'orderDetails.is_order_placed': true,
            }
          ]
        }
      },
      {
        $lookup: {
          from: 'variants',
          localField: 'variant_id',
          foreignField: '_id',
          as: 'varinatDetails'
        }
      },
      {
        $unwind: '$varinatDetails',
      },



      // DUE
      {
        $addFields: {
          hasSizeVariantId: { $cond: { if: { $gt: ["$sizeVariantId", null] }, then: true, else: false } },
        },
      },
      {
        $lookup: {
          from: "sizevariants",
          localField: "sizeVariantId",
          foreignField: "_id",
          as: "sizeVariantDetails",
        },
      },

      // {
      //   $lookup: {
      //     from: 'sizevariants',
      //     localField: 'sizeVariantId',
      //     foreignField: '_id',
      //     as: 'sizeVariantDetails'
      //   }
      // },

      // {
      //   $unwind: '$sizeVariantDetails',
      //   preserveNullAndEmptyArrays: true
      // },

      {
        $project: {
          _id: 1,
          short_order_id: 1,
          invoice_id: 1,


          // DUE
          hasSizeVariantId: 1,
          sizeVariantDetails: { $cond: { if: { $gt: ["$sizeVariantId", null] }, then: "$sizeVariantDetails", else: [] } },



          price: 1,
          quantity: 1,
          subTotalPrice: 1,
          deliveryCharge: 1,
          totalAmount: 1,

          is_cod: 1,
          is_payment_success: 1,
          order_payment_type: 1,

          productDetails: 1,
          varinatDetails: 1,

          sizeVariantDetails: 1,
          orderDetails: 1,

          is_canceled: 1,
          is_awb_generated: 1,

          // product_id: 1,
          // variant_id: 1,
          // sizeVariantId: 1,
        }
      }
    ])

    return res.status(200).send({ success: true, message: "Order items found", orderItems });
  } catch (error) {
    console.log("Error while getting order for generatinf awb number form admin", error);
    return res.status(500).send({ success: false, message: "Internal server error" })
  }
}