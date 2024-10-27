// const Order = require("../models/order/orderModel");
const Product = require("../models/products/product");
const cartModels = require("../models/cart/cartModels");
const productModel = require("../models/products/product");
const addressModel = require("../models/user/userAddressModel");
const response = require("../helper/commonResponse");
const { ErrorCode, SuccessCode } = require("../helper/statusCode");
const { SuccessMessage, ErrorMessage } = require("../helper/message");
// const orderModel = require("../models/orders/orderModel");
const orderModel = require("../models/orders/orderModels");
const SizeVariant = require("../models/products/sizeVariant")
const SizeVariantInventory = require("../models/products/sizeVariantInventory")
const Variant = require("../models/products/variant");
const Address = require("../models/user/userAddressModel");
const Order = require("../models/orders/orderModels");
const OrderItem = require("../models/orders/orderItem");
const { default: axios } = require("axios");
const Admin = require("../models/admin/admin")
const Seller = require("../models/seller/sellerModels")
const ShiprocketDetail = require("../models/orders/shiprocketDetail");
const VariantInventory = require("../models/products/variantInventory");

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
module.exports.newOrder = async function (req, res) {
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
}

// ===========

module.exports.getSingleOrderDetails = async (req, res) => {
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
}

// get all order of the user
module.exports.myOrders = async (req, res) => {
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
}

/* ======================ADMIN================== */
// Get All Orders ---ADMIN
module.exports.getAllOrders = async (req, res) => {
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
}

module.exports.updateOrder = async (req, res) => {
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
}

async function updateStock(id, quantity) {
  const product = await Product.findById(id);
  product.stocks -= quantity;
  await product.save({ validateBeforeSave: false });
}

// Delete Order ---ADMIN
module.exports.deleteOrder = async (req, res) => {
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
}

module.exports.getOrderBySellerId = async function (req, res) {
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
}

module.exports.orderHistory = async function (req, res) {
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
}

module.exports.placeClothingOrder = async (req, res) => {
  try {
    const {
      productId,
      variantId,
      sizeVariantId,
      selectedCourier,
      deliveryCharge,
      offeredPrice,
      totalAmont,
      deliveryAddress,
      quantity,
      is_cod
    } = req.body;

    const productDetail = await productModel.findOne({ _id: productId });
    if (!productDetail) {
      return res.status(400).send({ success: false, message: "Wrong details provided" });
    }

    const variantDetail = await Variant.findOne({ _id: variantId });
    if (!variantDetail) {
      return res.status(400).send({ success: false, message: "Wrong details provided" });
    }

    const sizeVariantDetail = await SizeVariant.findOne({ _id: sizeVariantId });
    if (!sizeVariantDetail) {
      return res.status(400).send({ success: false, message: "Wrong details provided" });
    }

    if (offeredPrice != sizeVariantDetail.offered_price) {
      return res.status(400).send({ success: false, message: "Wrong details provided" });
    }

    if (((offeredPrice * quantity) + deliveryCharge) != totalAmont) {
      return res.status(400).send({ success: false, message: "Wrong details provided" });
    }

    const sizeVariantInventoryDetail = await SizeVariantInventory.findOne({ size_variant_id: sizeVariantDetail._id });
    if (sizeVariantInventoryDetail.available_quantity < quantity) {
      return res.status(400).send({ success: false, message: "Wrong details provided" });
    }

    const address = await Address.findOne({ _id: deliveryAddress._id });
    if (!address) {
      return res.status(400).send({ success: false, message: "Wrong details provided" });
    }

    const newOrder = new Order({
      user_id: req.user._id,

      delivery_address_id: address._id,
      delivery_customer_name: address.name,
      delivery_custome_last_name: address.last_name,
      delivery_address: address.address,
      delivery_address_2: address.address_2,
      delivery_city: address.city,
      delivery_pincode: address.pincode,
      delivery_state: address.state,
      delivery_country: address.country,
      delivery_email: address.email,
      delivery_phone: address.phone_number,

      totalItems: 1,
      totalQuantity: quantity,
      subTotalPrice: (offeredPrice * quantity),
      deliveryCharge: deliveryCharge,
      totalAmount: totalAmont,

      is_cod: is_cod
    })

    const savedOrder = await newOrder.save();

    // generate short order id of numbers
    const short_order_id = Date.now();

    const newOrderItem = new OrderItem({
      order_id: savedOrder._id,
      short_order_id: short_order_id,

      price: offeredPrice,
      quantity: savedOrder.totalQuantity,
      subTotalPrice: savedOrder.subTotalPrice,
      deliveryCharge: savedOrder.deliveryCharge,
      totalAmount: savedOrder.totalAmount,

      is_cod: savedOrder.is_cod,

      product_id: productDetail._id,
      variant_id: variantDetail._id,
      sizeVariantId: sizeVariantDetail._id,
    })

    const savedOrderItem = await newOrderItem.save();

    // Update available_quantity, ordered_quantity
    sizeVariantInventoryDetail.available_quantity -= Number(quantity);
    sizeVariantInventoryDetail.ordered_quantity = Number(sizeVariantInventoryDetail.ordered_quantity) + Number(quantity);
    await sizeVariantInventoryDetail.save();

    if (is_cod == 1) {
      // if is_cod == 1, then place order and create delivery using shiprocket
      return res.status(201).send({ success: true, message: "Order placed", savedOrder });
    } else {
      // prepaid payment order and send to frontend
      // amount is savedOrder.totalAmount - for creating order

      return res.status(201).send({ success: true, message: "Order created", savedOrder });
    }
  } catch (error) {
    console.log("Error while placing clothing order", error);
    return res.status(500).send({ success: false, message: "Internal server error" });
  }
}

module.exports.paymentSuccess = async (req, res) => {
  try {
    const { orderDetail, selectedCourier } = req.body;
    // console.log(orderDetail);

    // Verify payment success - if success then update to order, else failed order placed

    const order = await Order.findOne({ _id: orderDetail._id });
    if (!order) {
      return res.status(400).send({ success: false, message: "Wrong details provided" });
    }

    order.is_order_placed = true;
    order.orderPlacedAt = Date.now();
    order.is_payment_success = true;
    order.order_payment_type = "UPI"; // payment method
    order.transactionId = Date.now(); // add transaction id
    order.paidAt = Date.now();

    await order.save();

    // Generate invoice id 

    const orderItemDetail = await OrderItem.findOne({ order_id: order._id });
    orderItemDetail.is_payment_success = true;
    orderItemDetail.order_payment_type = order.order_payment_type;
    orderItemDetail.transactionId = order.transactionId;
    orderItemDetail.paidAt = order.paidAt;
    orderItemDetail.invoice_id = Date.now();

    await orderItemDetail.save();

    const sizeVariantDetail = await SizeVariant.findOne({
      _id: orderItemDetail.
        sizeVariantId
    });
    const productDetail = await productModel.findOne({ _id: orderItemDetail.product_id })
    let seller;
    if (productDetail.is_admin_product) {
      seller = await Admin.findOne({ _id: productDetail.admin_id })
    } else {
      seller = await Seller.findOne({ _id: productDetail.seller_id })
    }

    // Place order with shiprocket
    const authRespose = await axios.post(`${process.env.SHIPROCKET_BASE_URL}/auth/login`, {
      email: process.env.SHIPROCKET_EMAIL,
      password: process.env.SHIPROCKET_PASSWORD,
    })

    const orderUrl = `${process.env.SHIPROCKET_BASE_URL}/orders/create/adhoc`

    const utcDate = order.orderPlacedAt;
    const istDate = new Date(utcDate.getTime() + (5.5 * 60 * 60 * 1000));
    const formattedDate = istDate.toISOString().split('T')[0];
    // console.log(formattedDate); // Output: 2024-10-24

    // orderPlacedAt, short_order_id, 
    const orderData = {
      order_id: orderItemDetail.short_order_id,
      order_date: formattedDate,

      // pickup_location: `${seller.pickup_id}`,
      // pickup_location: `${4866555}`,
      pickup_location: seller.pickup_location,

      billing_customer_name: order.delivery_customer_name,
      billing_last_name: order.delivery_custome_last_name,
      billing_address: order.delivery_address,
      billing_city: order.delivery_city,
      billing_pincode: order.delivery_pincode,
      billing_state: order.delivery_state,
      billing_country: order.delivery_country,
      billing_email: order.delivery_email,
      billing_phone: order.delivery_phone,
      shipping_is_billing: true,

      order_items: [
        {
          name: productDetail.product_name,
          sku: sizeVariantDetail.sku,
          hsn: sizeVariantDetail.hsn,
          units: orderItemDetail.quantity,
          selling_price: orderItemDetail.price,
        }
      ],

      payment_method: "Prepaid",
      sub_total: orderItemDetail.subTotalPrice,

      // sizevariantdetail
      length: sizeVariantDetail.length,
      breadth: sizeVariantDetail.breadth,
      height: sizeVariantDetail.height,
      weight: sizeVariantDetail.weight,

      courier_id: selectedCourier.courier_company_id,
    };

    // console.log(orderData)

    const response = await axios.post(orderUrl, orderData, {
      headers: {
        'Authorization': `Bearer ${authRespose.data.token}`, // Replace with your access token
        'Content-Type': 'application/json'
      }
    })

    // console.log(response);
    // console.log(response?.data);
    if (response?.data.status_code) {
      const newShiprocketDetail = new ShiprocketDetail({
        ...response?.data,
        courier_id: selectedCourier.courier_company_id,
        order_item_id: orderItemDetail._id
      })

      await newShiprocketDetail.save();
    }

    return res.status(200).send({ success: true, message: "Payment success! Order plcaed" });
  } catch (error) {
    console.log("Error while placing clothing order", error);
    // console.log(error?.response?.data);
    return res.status(500).send({ success: false, message: "Internal server error" });
  }
}

module.exports.placeDefaultCodOrder = async (req, res) => {
  try {
    let { productId,
      variantId,
      quantity,
      is_cod,

      selectedCourier,
      deliveryAddress,

      offeredPrice,
      subtotalPrice,
      deliveryCharge,
      totalAmont } = req.body;

    // Find product information
    const productDetail = await Product.findOne({ _id: productId });
    if (!productDetail) {
      return res.status(400).send({ success: false, message: "Wrong detail provided" })
    }

    // Find variant information
    const variantDetail = await Variant.findOne({ _id: variantId });
    if (!variantDetail) {
      return res.status(400).send({ success: false, message: "Wrong detail provided" })
    }

    // Find variant inventory information
    const variantInventoryDetail = await VariantInventory.findOne({ product_variant_id: variantId });
    if (!variantInventoryDetail) {
      return res.status(400).send({ success: false, message: "Wrong detail provided" })
    }

    // If available quantity less than order quantity
    if (variantInventoryDetail.available_quantity < quantity) {
      return res.status(400).send({ success: false, message: `Only ${variantInventoryDetail.available_quantity} product remaining` })
    }

    // Check for address confirmation
    const deliveryAddressDetail = await addressModel.findOne({ _id: deliveryAddress._id })
    if (!deliveryAddressDetail) {
      return res.status(400).send({ success: false, message: "Wrong detail provided" })
    }

    if (offeredPrice != variantDetail.offered_price) {
      return res.status(400).send({ success: false, message: "Offered price do not match" })
    }

    if ((offeredPrice * quantity) != subtotalPrice) {
      return res.status(400).send({ success: false, message: "Subtotal price do not match" })
    }

    if (is_cod === 0) {
      if (selectedCourier.freight_charge != deliveryCharge) {
        return res.status(400).send({ success: false, message: "Delivery charge do not match" })
      }
    } else {
      if ((selectedCourier.freight_charge + selectedCourier.cod_charges) != deliveryCharge) {
        return res.status(400).send({ success: false, message: "Delivery charge do not match" })
      }
    }

    if ((deliveryCharge + subtotalPrice) != totalAmont) {
      return res.status(400).send({ success: false, message: "Total price do not match" })
    }

    // Placing order
    // Creating new Order
    const newOrder = new Order({
      user_id: req.user._id,

      delivery_address_id: deliveryAddressDetail._id,
      delivery_customer_name: deliveryAddressDetail.name,
      delivery_custome_last_name: deliveryAddressDetail.last_name,
      delivery_address: deliveryAddressDetail.address,
      delivery_address_2: deliveryAddressDetail.address_2,
      delivery_city: deliveryAddressDetail.city,
      delivery_pincode: deliveryAddressDetail.pincode,
      delivery_state: deliveryAddressDetail.state,
      delivery_country: deliveryAddressDetail.country,
      delivery_email: deliveryAddressDetail.email,
      delivery_phone: deliveryAddressDetail.phone_number,

      totalItems: 1,
      totalQuantity: quantity,
      subTotalPrice: subtotalPrice,
      deliveryCharge: deliveryCharge,
      totalAmount: totalAmont,

      is_order_placed: true,
      orderPlacedAt: Date.now(),

      is_cod: is_cod,
    })

    const savedOrder = await newOrder.save();

    // generate short order id of numbers
    const short_order_id = Date.now();
    const randomNumber = Math.floor(10000 + Math.random() * 90000);
    // Generating invoice number
    const invoice_id = Date.now() + randomNumber;

    // Creating new order item
    const newOrderItem = new OrderItem({
      order_id: savedOrder._id,
      short_order_id: short_order_id,
      invoice_id: invoice_id,

      price: offeredPrice,
      quantity: savedOrder.totalQuantity,
      subTotalPrice: savedOrder.subTotalPrice,
      deliveryCharge: savedOrder.deliveryCharge,
      totalAmount: savedOrder.totalAmount,

      is_cod: savedOrder.is_cod,

      product_id: productDetail._id,
      variant_id: variantDetail._id
    })

    const savedOrderItem = await newOrderItem.save();

    // Update available_quantity, ordered_quantity
    variantInventoryDetail.available_quantity = Number(variantInventoryDetail.available_quantity) - Number(quantity);
    variantInventoryDetail.ordered_quantity = Number(variantInventoryDetail.ordered_quantity) + Number(quantity);
    await variantInventoryDetail.save();

    // Place order with shiprocket
    // Getting auth token from shiprocket
    const authRespose = await axios.post(`${process.env.SHIPROCKET_BASE_URL}/auth/login`, {
      email: process.env.SHIPROCKET_EMAIL,
      password: process.env.SHIPROCKET_PASSWORD,
    })

    const orderUrl = `${process.env.SHIPROCKET_BASE_URL}/orders/create/adhoc`

    const orderDate = new Date(savedOrder.orderPlacedAt).toLocaleDateString('en-CA');

    let seller;
    if (productDetail.is_admin_product) {
      seller = await Admin.findOne({ _id: productDetail.admin_id })
    } else {
      seller = await Seller.findOne({ _id: productDetail.seller_id })
    }

    // creating data for placing order with shiprocket
    const orderData = {
      order_id: savedOrderItem.short_order_id,
      order_date: orderDate,
      invoice_number: savedOrderItem.invoice_id,

      pickup_location: seller.pickup_location,

      billing_customer_name: savedOrder.delivery_customer_name,
      billing_last_name: savedOrder.delivery_custome_last_name,
      billing_address: savedOrder.delivery_address,
      billing_address_2: savedOrder.delivery_address_2,
      billing_city: savedOrder.delivery_city,
      billing_pincode: savedOrder.delivery_pincode,
      billing_state: savedOrder.delivery_state,
      billing_country: savedOrder.delivery_country,
      billing_email: savedOrder.delivery_email,
      billing_phone: savedOrder.delivery_phone,
      shipping_is_billing: true,

      order_items: [
        {
          name: productDetail.product_name,
          sku: variantDetail.sku,
          hsn: variantDetail.hsn,
          units: quantity,
          selling_price: offeredPrice,
        }
      ],

      payment_method: "COD",
      sub_total: subtotalPrice,

      
      length: variantDetail.length,
      breadth: variantDetail.breadth,
      height: variantDetail.height,
      weight: variantDetail.weight,

      courier_id: selectedCourier.courier_company_id,
    };

    // console.log(orderData)

    // Placing order with shiprocket
    const response = await axios.post(orderUrl, orderData, {
      headers: {
        'Authorization': `Bearer ${authRespose.data.token}`,
        'Content-Type': 'application/json'
      }
    })

    // Saving order detail
    if (response?.data.status_code) {
      const newShiprocketDetail = new ShiprocketDetail({
        ...response?.data,
        courier_id: selectedCourier.courier_company_id,
        order_item_id: savedOrderItem._id
      })

      await newShiprocketDetail.save();
    }

    return res.status(201).send({ success: true, message: "Payment success! Order plcaed" });
  } catch (error) {
    console.log("Error while placing clothing order", error);
    return res.status(500).send({ success: false, message: "Internal server error" });
  }
}