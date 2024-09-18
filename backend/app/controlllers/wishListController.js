const wishlistModel = require("../models/user/userWishListModels");
//const productModel = require("../models/products/productModel")
const response = require("../helper/commonResponse");
const { ErrorCode, SuccessCode } = require("../helper/statusCode");
const { ErrorMessage, SuccessMessage } = require("../helper/message");
const mongoose = require("mongoose");
//  GET Wishlist with Product Details
module.exports = {
  // getWishList: async (req, res) => {
  //   try {
  //     const user_id = req.user_id;
  //     const wishlist = await wishlistModel.aggregate([
  //       {
  //         $match: { user_id: mongoose.Types.ObjectId(user_id) },
  //       },
  //       {
  //         $lookup: {
  //           from: "products", // Assuming your product collection is named 'products'
  //           localField: "items.product",
  //           foreignField: "_id",
  //           as: "itemDetails",
  //         },
  //       },
  //       {
  //         $project: {
  //           user: 1,
  //           user_id: "$user_id",
  //           items: {
  //             $map: {
  //               input: "$items",
  //               as: "item",
  //               in: {
  //                 product_details: {
  //                   $let: {
  //                     vars: {
  //                       product: {
  //                         $arrayElemAt: [
  //                           {
  //                             $filter: {
  //                               input: "$itemDetails",
  //                               as: "detail",
  //                               cond: {
  //                                 $eq: ["$$detail._id", "$$item.product"],
  //                               },
  //                             },
  //                           },
  //                           0,
  //                         ],
  //                       },
  //                     },
  //                     in: {
  //                       _id: "$$product._id",
  //                       description: "$$product.description",
  //                       brand: "$$product.brand",
  //                       color: "$$product.color",
  //                       sizes: "$$product.sizes",
  //                       material: "$$product.material",
  //                       style: "$$product.style",
  //                       images:"$$product.images",
  //                       price: "$$product.price",
  //                       oldPrice: "$$product.oldPrice",
  //                       currency: "$$product.currency",
  //                       category: "$$product.category",
  //                       subCategory: "$$product.subCategory",
  //                       product_name: "$$product.product_name",
  //                       updatedAt: "$$product.updatedAt",
  //                     },
  //                   },
  //                 },
  //               },
  //             },
  //           },
  //           created_at: 1,
  //         },
  //       },
  //     ]);
  //     if (!wishlist || wishlist.length === 0) {
  //       return response.commonErrorResponse(
  //         res,
  //         ErrorCode.NOT_FOUND,
  //         {},
  //         ErrorMessage.NOT_FOUND
  //       );
  //     }
  //     return response.commonResponse(
  //       res,
  //       SuccessCode.SUCCESS,
  //       wishlist,
  //       SuccessMessage.DATA_FOUND
  //     );
  //   } catch (error) {
  //     return response.commonErrorResponse(
  //       res,
  //       ErrorCode.INTERNAL_ERROR,
  //       {},
  //       error.message
  //     );
  //   }
  // }
  getWishList: async function (req, res) {
    try {
      const user_id = req.user_id;
      const wishlist = await wishlistModel.aggregate([
        {
          $match: { user_id: mongoose.Types.ObjectId(user_id) },
        },
        {
          $lookup: {
            from: "products",
            localField: "items.product",
            foreignField: "_id",
            as: "productDetails",
          },
        },
        {
          $project: {
            items: 0,
          },
        },
      ]);

      if (wishlist.length === 0) {
        return response.commonErrorResponse(
          res,
          ErrorCode.NOT_FOUND,
          {},
          ErrorMessage.NOT_FOUND
        );
      }

      return response.commonResponse(
        res,
        SuccessCode.SUCCESS,
        wishlist,
        SuccessMessage.DATA_FOUND
      );
    } catch (error) {
      return response.commonErrorResponse(
        res,
        ErrorCode.INTERNAL_ERROR,
        {},
        error.message
      );
    }
  },
  // POST Add Item to Wishlist
  createWishList: async (req, res) => {
    try {
      const user_id = req.user_id;
      const { product_id } = req.body;
      const wishlist = await wishlistModel.findOne({ user_id: user_id });
      if (!wishlist) {
        // Create a new wishlist if it doesn't exist
        const newWishlist = await wishlistModel.create({
          user_id: user_id,
          items: [{ product: product_id }],
        });
        console.log(newWishlist);
        return response.commonResponse(
          res,
          SuccessCode.SUCCESSFULLY_CREATED,
          newWishlist, // Change wishlist to newWishlist
          SuccessMessage.newWishlist
        );
      }
      // Check if the product is already in the wishlist
      const existingItem = wishlist.items.find(
        (item) => item.product.toString() === product_id
      );
      if (!existingItem) {
        // If not, add a new item to the wishlist
        wishlist.items.push({ product: product_id });
        await wishlist.save();
      }
      return response.commonResponse(
        res,
        SuccessCode.SUCCESSFULLY_CREATED,
        wishlist,
        SuccessMessage.DATA_SAVED
      );
    } catch (error) {
      return response.commonErrorResponse(
        res,
        ErrorCode.INTERNAL_ERROR,
        {},
        error.message
      );
    }
  },
 
  removeFromWishlist: async (req, res) => {
    try {
      const user_id = req.user_id;
      const { product_id } = req.params;
      const wishlist = await wishlistModel.findOne({ user_id: user_id });
      if (!wishlist || !wishlist.items.length) {
        return response.commonErrorResponse(
          res,
          ErrorCode.NOT_FOUND,
          {},
          ErrorMessage.NOT_FOUND
        );
      }
      // Find the index of the item to be removed
      const itemIndex = wishlist.items.findIndex(
        (item) => item.product.toString() === product_id
      );
      if (itemIndex === -1) {
        return response.commonErrorResponse(
          res,
          ErrorCode.NOT_FOUND,
          {},
          ErrorMessage.ITEM_NOT_FOUND
        );
      }
      // Remove the item from the wishlist
      wishlist.items.splice(itemIndex, 1);
      await wishlist.save();
      return response.commonResponse(
        res,
        SuccessCode.SUCCESS,
        wishlist,
        SuccessMessage.ITEM_REMOVED
      );
    } catch (error) {
      return response.commonErrorResponse(
        res,
        ErrorCode.INTERNAL_ERROR,
        {},
        error.message
      );
    }
  },

};
