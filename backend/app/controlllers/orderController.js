// const Order = require("../models/order/orderModel");
const Product = require("../models/products/productModel");
const cartModels = require("../models/cart/cartModels");
const productModel = require("../models/products/productModel");
const addressModel = require("../models/user/userAddressModel");
const response = require("../helper/commonResponse");
const { ErrorCode, SuccessCode } = require("../helper/statusCode");
const { SuccessMessage, ErrorMessage } = require("../helper/message");
// const orderModel = require("../models/orders/orderModel");
const orderModel = require("../models/orders/orderModels");

// exports.newOrder = async function (req, res) {
//   try {
//     let user_id = req.user_id;
//     let data = req.body;
//     let {
//       address_id,
//       shippingInfo,
//       quantity,
//       product_id,
//       paymentInfo,
//       deliveredAt,
//       shippedAt,
//       sizes,
//     } = data;

//     //  this function for update stokes and count of all product

// async function updateProductDetails(size,quantity,productData){

//   sizes = {};
//   for (let sizeNumber in size) {
//     for (let i = 0; i < productData?.variations?.sizes?.length; i++) {

//       if (productData?.variations.sizes[i].hasOwnProperty(sizeNumber)) {

//         let s = JSON.parse(JSON.stringify(productData?.variations.sizes));
//         let count = JSON.parse(JSON.stringify(s[0]));
//         sizes[sizeNumber] = count[sizeNumber] - size[sizeNumber];

//         if (sizes[sizeNumber] < -1) {

//         return true
//         //  response.commonErrorResponse(
//         //     res,
//         //     ErrorCode.NOT_FOUND,
//         //     {},
//         //     "product Out of Stocks"
//         //   );
//         }
//         productData.variations.sizes = sizes;
//       } else {
//        return true
//         // response.commonErrorResponse(
//         //   res,
//         //   ErrorCode.BAD_REQUEST,
//         //   {},
//         //   "this size is not available"
//         // );
//       }
//     }
//   }
//   productData.stocks = productData.stocks - Number(quantity) || 1;

//   if (productData.stocks < -1) {

//     return true
//     // response.commonErrorResponse(
//     //   res,
//     //   ErrorCode.NOT_FOUND,
//     //   {},
//     //   "product Out of Stocks"
//     // );
//   }

//   let updateProduct = await productModel.findByIdAndUpdate(
//     productData._id,
//     { $set: productData },
//     { new: true }
//   );

// }

//     // ===========================
//     paymentInfo = JSON.parse(paymentInfo);
//     if (data.cart_id) {
//       let cart_items = await cartModels.findById(data.cart_id);

//       if (!cart_items) {
//         return response.commonResponse(
//           res,
//           ErrorCode.NOT_FOUND,
//           {},
//           ErrorMessage.NOT_FOUND
//         );
//       }
//       let productIdes = [];

//       for (let i = 0; i < cart_items.items.length; i++) {
//         productIdes.push(cart_items.items[i].product_id);
//       }

//       let products = await productModel.find({ _id: { $in: productIdes } });

//       let orderItems = [];

//       for (let i = 0; i < products.length; i++) {
//         let orderItem = {
//           product_name: products[i].name,
//           price:
//             products[i]?.price *
//               cart_items.items.filter(
//                 (data) =>
//                   data.product_id.toString() == products[i]._id.toString()
//               )[0]["quantity"] || 1,

//           product_id: products[i]._id.toString(),
//           quantity: cart_items.items.filter(
//             (data) => data.product_id.toString() == products[i]._id.toString()
//           )[0]["quantity"],
//           color: cart_items.items.filter(
//             (data) => data.product_id.toString() == products[i]._id.toString()
//           )[0]["color"],
//           sizes: cart_items.items.filter(
//             (data) => data.product_id.toString() == products[i]._id.toString()
//           )[0]["sizes"],
//         };

//         orderItems.push(orderItem);
//       }

//       let totalQuantity = 0;
//       let totalPrice = 0;

//       orderItems.forEach((item) => {
//         totalQuantity += item.quantity;
//         totalPrice += item.price * item.quantity;
//       });
//       let totalItems = orderItems.length;

//       let finalData = {
//         totalQuantity: orderItems.reduce((accumulator, currentProduct) => {
//           return accumulator + (currentProduct?.quantity || 0);
//         }, 0),
//         totalPrice: orderItems.reduce((accumulator, currentProduct) => {
//           return accumulator + (currentProduct.price || 0);
//         }, 0),
//         user_id, // ok
//         shippingInfo, //ok
//         address_id, //ok
//         orderItems: orderItems, //ok
//         totalItems: orderItems?.length, //ok
//         paymentInfo, // ok
//         deliveredAt, //ok
//         shippedAt, //ok
//       };
//       // products.map( async (product) =>{
//       //   let sizes= cart_items.items.filter(
//       //     (data) => data.product_id.toString() == product._id.toString()
//       //   )[0]["sizes"][0]
//       //   let  quantity= cart_items.items.filter(
//       //     (data) => data.product_id.toString() == product._id.toString()
//       //   )[0]["quantity"]
//       //   console.log(sizes, "===============================",quantity,"==========================",product)
//       //   let updateD=await updateProductDetails(sizes ,quantity,product )

//       //   if(updateD){
//       //     return response.commonErrorResponse(
//       //       res,
//       //       ErrorCode.NOT_FOUND,
//       //       {},
//       //       "product Out of Stocks"
//       //     );

//       //   }

//       // })
//       // ============================================this new
//       // Create a mapping of product_id to cart item
// let cartItemMap = new Map(cart_items.items.map(item => [item.product_id.toString(), item]));

// // Iterate over products using for loop
// for (let i = 0; i < products.length; i++) {
//     let product = products[i];
//     let cartItem = cartItemMap.get(product._id.toString()); // Retrieve cart item from the mapping

//     if (!cartItem) {
//         continue; // Skip to the next iteration if cart item not found
//     }

//     let sizes = cartItem.sizes[0];
//     let quantity = cartItem.quantity;

//     let updateD = await updateProductDetails(sizes, quantity, product);

//     if (updateD) {
//         return response.commonErrorResponse(
//             res,
//             ErrorCode.NOT_FOUND,
//             {},
//             "product Out of Stocks"
//         );
//     }
// }

//       // =================

//       let createdOrder = await orderModel.create(finalData);
//       if (!createdOrder) {
//         createdOrder = await Order.create(finalData);

//         if (!createdOrder) {
//           return response.commonErrorResponse(
//             res,
//             ErrorCode.WENT_WRONG,
//             {},
//             ErrorMessage.SOMETHING_WRONG
//           );
//         }
//       } else {
//         return response.commonResponse(
//           res,
//           SuccessCode.SUCCESSFULLY_CREATED,
//           createdOrder,
//           SuccessMessage.DATA_SAVED
//         );
//       }
//     } else {
//       let productData = await productModel.findById(product_id);
//       if (!productData) {
//         return response.commonErrorResponse(
//           res,
//           ErrorCode.BAD_REQUEST,
//           {},
//           ErrorMessage.NOT_FOUND
//         );
//       }

//       let finalData = {
//         totalQuantity: quantity,
//         totalPrice: productData?.price * quantity,
//         user_id: user_id,
//         shippingInfo: shippingInfo,
//         address_id: address_id,
//         orderItems: [
//           {
//             product_name: productData.name,
//             price: productData.price,
//             sizes: JSON.parse(sizes),
//             color:
//               data.color?.length > 0
//                 ? data.color
//                 : productData?.variations?.color,
//             product_id: productData._id,
//             quantity: quantity,
//           },
//         ],
//         totalItems: 1,
//         paymentInfo: paymentInfo,
//         deliveredAt: deliveredAt,
//         shippedAt: shippedAt,
//       };

//       // this is for update count in seller product(stocks)

//       let size = JSON.parse(sizes);
//       sizes = {};
//       for (let sizeNumber in size) {
//         for (let i = 0; i < productData?.variations?.sizes?.length; i++) {

//           if (productData?.variations.sizes[i].hasOwnProperty(sizeNumber)) {

//             let s = JSON.parse(JSON.stringify(productData?.variations.sizes));
//             let count = JSON.parse(JSON.stringify(s[0]));
//             sizes[sizeNumber] = count[sizeNumber] - size[sizeNumber];

//             if (sizes[sizeNumber] < -1) {
//               return response.commonErrorResponse(
//                 res,
//                 ErrorCode.NOT_FOUND,
//                 {},
//                 "product Out of Stocks"
//               );
//             }
//             productData.variations.sizes = sizes;
//           } else {
//             return response.commonErrorResponse(
//               res,
//               ErrorCode.BAD_REQUEST,
//               {},
//               "this size is not available"
//             );
//           }
//         }
//       }
//       productData.stocks = productData.stocks - Number(quantity) || 1;

//       if (productData.stocks < -1) {
//         return response.commonErrorResponse(
//           res,
//           ErrorCode.NOT_FOUND,
//           {},
//           "product Out of Stocks"
//         );
//       }

//       let updateProduct = await productModel.findByIdAndUpdate(
//         product_id,
//         { $set: productData },
//         { new: true }
//       );

//       // ==================

//       let createdOrder = await orderModel.create(finalData);
//       if (!createdOrder) {
//         createdOrder = await orderModel.create(finalData);

//         if (!createdOrder) {
//           return response.commonErrorResponse(
//             res,
//             ErrorCode.WENT_WRONG,
//             {},
//             ErrorMessage.SOMETHING_WRONG
//           );
//         }
//       } else {
//         return response.commonResponse(
//           res,
//           SuccessCode.SUCCESSFULLY_CREATED,
//           createdOrder,
//           SuccessMessage.DATA_SAVED
//         );
//       }
//     }
//   } catch (error) {
//     return response.commonErrorResponse(
//       res,
//       ErrorCode.INTERNAL_ERROR,
//       {},
//       error.message
//     );
//   }
// };
// ============= working order API
exports.newOrder = async function (req, res) {
  try {
    let user_id = req.user_id;
    let data = req.body;
    let {
      address_id,
      shippingInfo,

      paymentInfo,
      deliveredAt,
      shippedAt,
    } = data;

    //  this function for update stokes and count of all product

    async function updateProductDetails(quantity, productData) {
      productData.stocks = productData.stocks - Number(quantity) || 1;

      if (productData.stocks < -1) {
        return true;
        // response.commonErrorResponse(
        //   res,
        //   ErrorCode.NOT_FOUND,
        //   {},
        //   "product Out of Stocks"
        // );
      }

      let updateProduct = await productModel.findByIdAndUpdate(
        productData._id,
        { $set: productData },
        { new: true }
      );
    }

    // ===========================
    paymentInfo = JSON.parse(paymentInfo);
    if (data.cart_id) {
      let cart_items = await cartModels.findById(data.cart_id);

      if (!cart_items) {
        return response.commonResponse(
          res,
          ErrorCode.NOT_FOUND,
          {},
          ErrorMessage.NOT_FOUND
        );
      }
      let productIdes = [];

      for (let i = 0; i < cart_items.items.length; i++) {
        productIdes.push(cart_items.items[i].product_id);
      }

      let products = await productModel.find({ _id: { $in: productIdes } });

      let orderItems = [];

      for (let i = 0; i < products.length; i++) {
        let orderItem = {
          product_name: products[i].name,
          price:
            products[i]?.price *
              cart_items.items.filter(
                (data) =>
                  data.product_id.toString() == products[i]._id.toString()
              )[0]["quantity"] || 1,

          product_id: products[i]._id.toString(),
          quantity: cart_items.items.filter(
            (data) => data.product_id.toString() == products[i]._id.toString()
          )[0]["quantity"],
          color: cart_items.items.filter(
            (data) => data.product_id.toString() == products[i]._id.toString()
          )[0]["color"],
        };

        orderItems.push(orderItem);
      }

      let totalQuantity = 0;
      let totalPrice = 0;

      orderItems.forEach((item) => {
        totalQuantity += item.quantity;
        totalPrice += item.price * item.quantity;
      });
      let totalItems = orderItems.length;

      let finalData = {
        totalQuantity: orderItems.reduce((accumulator, currentProduct) => {
          return accumulator + (currentProduct?.quantity || 0);
        }, 0),
        totalPrice: orderItems.reduce((accumulator, currentProduct) => {
          return accumulator + (currentProduct.price || 0);
        }, 0),
        user_id, // ok
        shippingInfo, //ok
        address_id, //ok
        orderItems: orderItems, //ok
        totalItems: orderItems?.length, //ok
        paymentInfo, // ok
        deliveredAt, //ok
        shippedAt, //ok
      };

      let cartItemMap = new Map(
        cart_items.items.map((item) => [item.product_id.toString(), item])
      );

      // Iterate over products using for loop
      for (let i = 0; i < products.length; i++) {
        let product = products[i];
        let cartItem = cartItemMap.get(product._id.toString()); // Retrieve cart item from the mapping

        if (!cartItem) {
          continue; // Skip to the next iteration if cart item not found
        }

        let quantity = cartItem.quantity;

        let updateD = await updateProductDetails(quantity, product);

        if (updateD) {
          return response.commonErrorResponse(
            res,
            ErrorCode.NOT_FOUND,
            {},
            "product Out of Stocks"
          );
        }
      }

      let createdOrder = await orderModel.create(finalData);
      if (!createdOrder) {
        createdOrder = await Order.create(finalData);

        if (!createdOrder) {
          return response.commonErrorResponse(
            res,
            ErrorCode.WENT_WRONG,
            {},
            ErrorMessage.SOMETHING_WRONG
          );
        }
      } else {
        return response.commonResponse(
          res,
          SuccessCode.SUCCESSFULLY_CREATED,
          createdOrder,
          SuccessMessage.DATA_SAVED
        );
      }
    } else {
      return response.commonErrorResponse(
        res,
        ErrorCode.NOT_FOUND,
        {},
        "for Order Cart_id And Card Data is required"
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
};

// ===========

(exports.getSingleOrderDetails = async (req, res) => {
  try {
    const singleOrder = await Order.findById(req.params.id);

    if (!singleOrder) {
      return response.commonErrorResponse(
        res,
        ErrorCode.NOT_FOUND,
        {},
        ErrorMessage.NOT_FOUND
      );
    }

    if (singleOrder) {
      return response.commonResponse(
        res,
        SuccessCode.SUCCESS,
        singleOrder,
        SuccessMessage.DETAIL_GET
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
}),
  // get all order of the user
  (exports.myOrders = async (req, res) => {
    try {
      const FetchedOrders = await Order.findOne();

      // Check if orders are found
      if (!FetchedOrders) {
        return response.commonErrorResponse(
          res,
          ErrorCode.NOT_FOUND,
          {},
          ErrorMessage.NOT_FOUND
        );
      } else {
        // Return success response with orders
        return response.commonResponse(
          res,
          SuccessCode.SUCCESS,
          FetchedOrders,
          SuccessMessage.DETAIL_GET
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
  }),
  /* ======================ADMIN================== */
  // Get All Orders ---ADMIN
  (exports.getAllOrders = async (req, res) => {
    try {
      const orders = await Order.find();

      if (!orders) {
        return response.commonErrorResponse(
          res,
          ErrorCode.NOT_FOUND,
          {},
          ErrorMessage.NOT_FOUND
        );
      }

      let totalAmount = 0;
      orders.forEach((order) => {
        totalAmount += order.totalPrice;
      });

      res.status(200).json({
        success: true,
        orders,
        totalAmount,
      });
    } catch (error) {
      return response.commonErrorResponse(
        res,
        ErrorCode.INTERNAL_ERROR,
        {},
        error.message
      );
    }
  });
exports.updateOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return response.commonErrorResponse(
        res,
        ErrorCode.NOT_FOUND,
        {},
        ErrorMessage.NOT_FOUND
      );
    }
    if (order.orderStatus === "Delivered") {
      return res.status(400).send({
        error: "ORDER_ALREADY_DELIVERED",
        message: "The order has already been delivered.",
      });
    }

    if (req.body.status === "Shipped") {
      order.shippedAt = Date.now();
      order.orderItems.forEach(async (i) => {
        await updateStock(i.product, i.quantity);
      });
    }

    order.orderStatus = req.body.status;
    if (req.body.status === "Delivered") {
      order.deliveredAt = Date.now();
    }

    await order.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    return response.commonErrorResponse(
      res,
      ErrorCode.INTERNAL_ERROR,
      {},
      error.message
    );
  }
};

async function updateStock(id, quantity) {
  const product = await Product.findById(id);
  product.stocks -= quantity;
  await product.save({ validateBeforeSave: false });
}

// Delete Order ---ADMIN
exports.deleteOrder = async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return response.commonErrorResponse(
      res,
      ErrorCode.NOT_FOUND,
      {},
      ErrorMessage.NOT_FOUND
    );
  }

  await order.remove();

  res.status(200).json({
    success: true,
  });
};

exports.getOrderBySellerId = async function (req, res) {
  try {
    let seller_id = req.seller_id;

    let orderDetails = await orderModel.aggregate([
      {
        $lookup: {
          from: "products",
          localField: "",
        },
      },
    ]);
  } catch (error) {
    return response.commonErrorResponse(
      res,
      ErrorCode.INTERNAL_ERROR,
      {},
      error.message
    );
  }
};

exports.orderHistory = async function (req, res) {
  try {
    let user_id = req.user_id;
    let allOrder = await orderModel.find({ user_id: user_id });
    if (!allOrder?.length == 0) {
      return response.commonErrorResponse(
        res,
        ErrorCode.BAD_REQUEST,
        [],
        ErrorMessage.NOT_FOUND
      );
    } else {
      return response.commonResponse(
        res,
        SuccessCode.SUCCESS,
        allOrder,
        SuccessMessage.DATA_FOUND
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
};
