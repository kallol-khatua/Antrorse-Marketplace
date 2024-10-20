const { default: mongoose } = require("mongoose");
const response = require("../helper/commonResponse");
const { SuccessMessage, ErrorMessage } = require("../helper/message");
const { SuccessCode, ErrorCode } = require("../helper/statusCode");
const CartItem = require("../models/cart/cartItem");
const cartModel = require("../models/cart/cartModels");
const userModel = require("../models/user/userModel");

module.exports.createCart = async function (req, res) {
  try {
    const data = req.body;
    let { product_type, quantity, product_id, variant_id, size_variant_id, size } = data;
    const user_id = req.user._id;

    const newCartItem = new CartItem({
      user_id,
      product_type,
      quantity,
      product_id,
      variant_id,
      size_variant_id,
      size
    })
    const savedCartItem = await newCartItem.save();

    return res.status(201).send({ success: true, message: "Item added to cart!", savedCartItem });
  } catch (error) {
    console.log("Error while adding product to the cart", error);
    return res.status(500).send({ success: false, message: "Internal server error!" });
  }
}

module.exports.getCartData = async function (req, res) {
  try {
    const cartItems = await CartItem.aggregate([
      {
        $match: {
          user_id: new mongoose.Types.ObjectId(req.user._id)
        }
      }
    ])
    return res.status(200).send({ success: true, message: "Cart items found!", cartItems });
  } catch (error) {
    console.log("Error while fetching product from cart", error);
    return res.status(500).send({ success: false, message: "Internal server error!" });
  }
}

module.exports.removeItemsToCart = async function (req, res) {
  try {
    let user_id = req.user_id;
    let product_id = req.params.product_id;
    let cartItem = await cartModel.findOne({ user_id: user_id });
    if (!cartItem) {
      return response.commonErrorResponse(
        res,
        ErrorCode.NOT_FOUND,
        {},
        ErrorMessage.NOT_FOUND
      );
    }
    let arr = cartItem.items.filter((product, i) => {
      return product.product_id != product_id;
    });
    cartItem.items = arr;
    let cartData = await cartModel.findOneAndUpdate(
      { user_id: user_id },
      { $set: cartItem },
      { new: true }
    );
    if (!cartData) {
      return response.commonErrorResponse(
        res,
        ErrorCode.NOT_FOUND,
        {},
        ErrorMessage.NOT_FOUND
      );
    } else {
      return response.commonResponse(
        res,
        SuccessCode.SUCCESS,
        cartData,
        SuccessMessage.UPDATE_SUCCESS
      );
    }
  } catch (error) {
    return response.commonErrorResponse(
      res,
      ErrorCode.INTERNAL_ERROR,
      {},
      error.message
    );
  }
}

module.exports.removeCart = async function (req, res) {
  try {
    let cart_id = req.params.cart_id;
    let user_id = req.user_id;
    let cartDelete = await cartModel.findOneAndDelete({
      _id: cart_id,
      user_id: user_id,
    });
    if (cartDelete) {
      return response.commonResponse(
        res,
        SuccessCode.SUCCESS,
        {},
        SuccessMessage.DELETE_SUCCESS
      );
    } else {
      return response.commonErrorResponse(
        res,
        ErrorCode.NOT_FOUND,
        {},
        ErrorMessage.NOT_FOUND
      );
    }
  } catch (error) {
    return response.commonErrorResponse(
      res,
      ErrorCode.INTERNAL_ERROR,
      {},
      error.message
    );
  }
}