const mongoose = require("mongoose");
const response = require("../helper/commonResponse");
const { SuccessMessage, ErrorMessage } = require("../helper/message");
const { ErrorCode, SuccessCode } = require("../helper/statusCode");
const commonFunction = require("../helper/commonFunction");
const validation = require("../helper/validation");

const Cart = require("../models/cart/cartModels");
const Product = require("../models/products/productModel");
const Address = require("../models/user/userAddressModel");
const Seller = require("../models/seller/sellerModels");

async function createChkOutAndUpdateCart(
  user_id,
  product_id,
  quantity,
  color,
  sizes
) {
  try {
    const productDetails = await Product.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(product_id),
        },
      },
      {
        $lookup: {
          from: "sellers",
          localField: "seller_id",
          foreignField: "_id",
          as: "sellerInfo",
        },
      },
      {
        $addFields: {
          sellerInfo: { $arrayElemAt: ["$sellerInfo", 0] },
        },
      },
      {
        $project: {
          "sellerInfo._id": 0,
          "sellerInfo.password": 0,
        },
      },
    ]);

    // Fetch user address
    const userAddress = await Address.find({ user_id: user_id });

    // Update the cart with the product details
    await updateCart(user_id, productDetails, quantity, color);
    console.log("Cart updated successfully");

    // Calculate total price for the item
    const totalPriceForItem = productDetails[0].price * quantity;
    const size = Object.keys(sizes)[0];
    // Construct order item
    const orderItem = {
      productName: productDetails[0].name,
      size: size,
      color: color,
      quantity: quantity,
      totalPrice: totalPriceForItem,
      img: productDetails[0].images[0],
    };

    // Calculate total cart price
    const totalCartPrice = totalPriceForItem;

    // Calculate GST (assuming GST is 10% of the total cart price)
    const gstAmount = totalCartPrice * 0.1;

    // Calculate subtotal price
    const subtotalPrice = totalCartPrice + gstAmount;

    // Construct order object
    const order = {
      orderItems: [orderItem],
      totalCartPrice: totalCartPrice,
      GST_Amount: gstAmount,
      subtotalPrice: subtotalPrice,
      userAddress: userAddress,
    };

    if (order) {
      return order;
    }
  } catch (error) {
    console.error("Error creating checkout and updating cart:", error);
    throw new Error(
      "Failed to create checkout and update cart: " + error.message
    );
  }
}

async function updateCart(user_id, productDetails, quantity, color) {
  try {
    const cart = await Cart.findOne({ user_id });

    if (!cart) {
      throw new Error("Cart not found for user_id: " + user_id);
    }

    // Check if the product already exists in the cart
    const existingItemIndex = cart.items.findIndex(
      (item) => item.product_id.toString() === productDetails[0]._id.toString()
    );

    if (existingItemIndex !== -1) {
      console.log("Product already exists in cart. Skipping update.");
      return;
    }

    // Add the new item to the cart
    cart.items.push({
      product_id: productDetails[0]._id,
      quantity,
      color,
    });

    // Update the totalItems field
    cart.totalItems = cart.items.length;

    await cart.save();
  } catch (error) {
    console.error("Error updating cart:", error);
    throw new Error("Failed to update cart: " + error.message);
  }
}

exports.checkout = async (req, res) => {
  try {
    // Ensure user is authenticated
    if (!req.user_id) {
      return response.commonErrorResponse(
        res,
        ErrorCode.INVALID_CREDENTIAL,
        {},
        ErrorMessage.INVALID_CREDENTIAL
      );
    }

    let order = null;

    // Check if product_id, quantity, and color are present in the req.body
    const { product_id, quantity, color, sizes } = req.body;
    if (product_id && quantity && color && sizes) {
      // If all required fields are present, create order and update cart
      order = await createChkOutAndUpdateCart(
        req.user_id,
        product_id,
        quantity,
        color,
        sizes
      );
    } else {
      // Fetch cart items including user address
      const cartItems = await Cart.aggregate([
        { $match: { user_id: req.user_id } },
        {
          $lookup: {
            from: "addresses",
            localField: "user_id",
            foreignField: "user_id",
            as: "address",
          },
        },
      ]);
      // Check if cart is empty
      if (!cartItems || cartItems.length === 0) {
        return response.commonErrorResponse(
          res,
          ErrorCode.NOT_FOUND,
          {},
          ErrorMessage.CART_EMPTY
        );
      }

      // Get the first element of cartItems array
      const firstCartItem = cartItems[0];

      // Get the address array from the firstCartItem
      const userAddress = firstCartItem.address;

      // Flatten the array of arrays to have only one array of items
      const itemsArray = [].concat(...cartItems.map((cart) => cart.items));

      if (!itemsArray || itemsArray.length === 0) {
        return response.commonErrorResponse(
          res,
          ErrorCode.NOT_FOUND,
          {},
          ErrorMessage.NOT_FOUND
        );
      }

      // Define an array to store product objectIds
      const productIds = itemsArray.map((item) => item.product_id);

      const productDetails = await Product.aggregate([
        {
          $match: {
            _id: { $in: productIds },
          },
        },
        {
          $lookup: {
            from: "sellers",
            localField: "seller_id",
            foreignField: "_id",
            as: "sellerInfo",
          },
        },
        {
          $addFields: {
            sellerInfo: { $arrayElemAt: ["$sellerInfo", 0] },
          },
        },
      ]);

      const orderItems = [];
      const totalPriceArray = [];
      let totalPrice = 0;
      for (const item of itemsArray) {
        const productDetail = productDetails.find(
          (product) => product._id.toString() === item.product_id.toString()
        );

        if (productDetail) {
          const totalPriceForItem = productDetail.price * item.quantity;

          totalPrice += totalPriceForItem;
          totalPriceArray.push(totalPrice);

          const size = item.sizes ? Object.keys(item.sizes)[0] : "";

          const orderItem = {
            productName: productDetail.name,
            size,
            brand_Name: productDetail.variations.brand_name,
            quantity: item.quantity,
            color: item.color,
            img: productDetail.images[0],
            sellerName: productDetail.sellerInfo.fullName,
            totalPrice: totalPriceForItem,
          };

          orderItems.push(orderItem);
        }
      }

      //Calculate the total price for all items
      const totalCartPrice = totalPriceArray.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      );

      // Calculate GST (10% of the total cart price)
      const gstAmount = totalCartPrice * 0.1;

      // Calculate subtotal price (total cart price + GST)
      const subtotalPrice = totalCartPrice + gstAmount;

      // Construct the order object
      order = {
        orderItems: orderItems,
        totalCartPrice: totalCartPrice,
        GST_Amount: gstAmount,
        subtotalPrice: subtotalPrice,
        userAddress: userAddress,
      };
    }

    if (order) {
      return response.commonResponse(
        res,
        SuccessCode.SUCCESS,
        order,
        SuccessMessage.CHK_OUT_SUCCESS
      );
    }
  } catch (error) {
    console.error("Error during checkout:", error);
    return response.commonErrorResponse(
      res,
      ErrorCode.INTERNAL_ERROR,
      {},
      error.message
    );
  }
};

// async function updateCart(user_id, productDetails, quantity, color) {
//   try {
//     const updatedCart = await Cart.aggregate([
//       {
//         $match: { user_id: user_id }
//       },
//       {
//         $addFields: {
//           items: {
//             $cond: {
//               if: {
//                 $not: {
//                   $in: [productDetails[0]._id, "$items.product_id"]
//                 }
//               },
//               then: {
//                 $concatArrays: [
//                   "$items",
//                   [{
//                     product_id: productDetails[0]._id,
//                     quantity,
//                     color,
//                   }]
//                 ]
//               },
//               else: "$items"
//             }
//           }
//         }
//       },
//       {
//         $set: {
//           totalItems: { $size: "$items" }
//         }
//       }
//     ]);

//     if (!updatedCart || updatedCart.length === 0) {
//       throw new Error("Cart not found for user_id: " + user_id);
//     }

//     console.log("Cart updated successfully:", updatedCart);
//   } catch (error) {
//     console.error("Error updating cart:", error);
//     throw new Error("Failed to update cart: " + error.message);
//   }
// }
