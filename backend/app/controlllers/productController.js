const productModel = require("../models/products/product");
const productReview = require("../models/products/productReview");
const response = require("../helper/commonResponse");
const { SuccessMessage, ErrorMessage } = require("../helper/message");
const { ErrorCode, SuccessCode } = require("../helper/statusCode");
const validation = require("../helper/validation");
const commonFunction = require("../helper/commonFunction");
const mongoose = require("mongoose");
const { uploadFile } = require("../middleware/AWS");
// const Product = require("../models/products/product")
const Inventory = require("../models/products/variantInventory")
const Variant = require("../models/products/variant")


module.exports.AddProduct = async function (req, res) {
  try {
    let data = req.body;

    console.log(data, "addproduct")
    if (
      !data.name ||
      !data.description ||
      !data.price ||
      !data.stock
      // ||!data.category
    ) {
      return response.commonErrorResponse(
        res,
        ErrorCode.MISSING_FIELDS,
        {},
        "Required fields are missing."
      );
    }
    // Convert string numbers to number type
    data.price = parseFloat(data.price);

    data.stock = parseInt(data.stock);

    if (data.tags && typeof data.tags == "string") {
      data.tags = JSON.parse(data.tags);
    }
    // Handle edge cases for numeric fields
    if (isNaN(data.price) || isNaN(data.stock)) {
      return response.commonErrorResponse(
        res,
        ErrorCode.INVALID_DATA,
        {},
        "Price and stocks must be numeric."
      );
    }

    // Parse variations if provided
    if (data.variations && typeof data.variations === "string") {
      data.variations = JSON.parse(data.variations);
    }
    let files = req.files;
    let arr = [];
    if (files?.length > 0) {
      for (let i = 0; i < files.length; i++) {
        let img = await uploadFile(files[i]);
        arr.push(img);
      }
    }
    data.images = arr;
    let seller_id = req.seller_id;
    data.seller_id = seller_id;
    let addedProducts = await productModel.create(data);
    if (addedProducts) {
      return response.commonResponse(
        res,
        SuccessCode.SUCCESSFULLY_CREATED,
        addedProducts
      );
    } else {
      return response.commonErrorResponse(
        res,
        ErrorCode.WENT_WRONG,
        {},
        ErrorMessage.SOMETHING_WRONG
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

module.exports.getAllProductBySellerId = async function (req, res) {
  try {
    let seller_id = req.seller_id;
    let allProducts = await productModel.find({ seller_id: seller_id });
    if (allProducts?.length > 0) {
      return response.commonResponse(
        res,
        SuccessCode.SUCCESS,
        allProducts,
        SuccessMessage.DATA_FOUND
      );
    } else {
      return response.commonErrorResponse(
        res,
        ErrorCode.BAD_REQUEST,
        [],
        ErrorMessage
      );
    }
  } catch (error) {
    return response.commonErrorResponse(
      res,
      ErrorCode.INTERNAL_ERROR,
      error.message,
      ErrorMessage.INTERNAL_ERROR
    );
  }
}
module.exports.getProductById = async function (req, res) {
  try {
    let product_id = req.params.product_id;
    let product = await productModel.findById(product_id);
    if (product) {
      return response.commonResponse(
        res,
        SuccessCode.SUCCESS,
        product,
        SuccessMessage.DATA_FOUND
      );
    } else {
      return response.commonErrorResponse(
        res,
        ErrorCode.NOT_FOUND,
        "",
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

module.exports.searchProducts = async function (req, res) {
  try {
    let data = req.query;
    const condition = {};
    if (data.search && data.search != "") {
      const keywords = data.search.trim().split(/\s+/); // Split the search query into keywords
      const regexKeywords = keywords.map(
        (keyword) => new RegExp(keyword, "i")
      );
      // Construct condition for each keyword
      condition.$or = [
        { name: { $in: regexKeywords } },
        { description: { $in: regexKeywords } },
        { category: { $in: regexKeywords } },
        { subCategory: { $in: regexKeywords } },
        { "variations.brand_name": { $in: regexKeywords } },
        { "variations.mater": { $in: regexKeywords } },
        { "variations.color": { $in: regexKeywords } },
      ];
    }
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;
    let allProduct = await productModel.aggregate([
      {
        $match: condition,
      },
      // {
      //   $skip: skip,
      // },
      // {
      //   $limit: limit,
      // },
      {
        $lookup: {
          from: "productReviews",
          localField: "_id",
          foreignField: "product_id",
          as: "allRatingAndReview",
        },
      },
      {
        $addFields: {
          ratingAVG: { $avg: "$allRatingAndReview.rating" },
        },
      },
    ]);
    return response.commonResponse(
      res,
      SuccessCode.SUCCESS,
      allProduct,
      SuccessMessage.DATA_FOUND
    );
  } catch (error) {
    return response.commonErrorResponse(
      res,
      ErrorCode.INTERNAL_ERROR,
      [],
      error.message,
      ErrorMessage.INTERNAL_ERROR
    );
  }
}

module.exports.getProductBySubcategory = async function (req, res) {
  try {
    let data = req.query;
    let filter = {};

    if (data.category && data.subCategory) {
      // Use $and when both category and subcategory are present
      filter.$and = [
        { category: data.category },
        { subCategory: data.subCategory },
      ];
    } else if (data.category || data.subCategory) {
      // Use $or when either category or subcategory is present
      filter.$or = [];

      if (data.category) {
        filter.$or.push({ category: data.category });
      }

      if (data.subCategory) {
        filter.$or.push({ subCategory: data.subCategory });
      }
    }

    let products = await productModel.find(filter);

    return response.commonResponse(
      res,
      SuccessCode.SUCCESS,
      products,
      SuccessMessage.DATA_FOUND
    );
  } catch (error) {
    return response.commonErrorResponse(
      res,
      ErrorCode.INTERNAL_ERROR,
      [],
      error.message,
      ErrorMessage.INTERNAL_ERROR
    );
  }
}

module.exports.updateProduct = async function (req, res) {
  try {
    let data = req.body;
    let product_id = req.params.product_id;
    let files = req.files;
    // here image validation pending

    let updatedProduct = await productModel.findByIdAndUpdate(
      product_id,
      { $set: data },
      { new: true, upsert: true }
    );
    if (updatedProduct) {
      return response.commonResponse(
        res,
        SuccessCode.SUCCESS,
        updatedProduct,
        SuccessMessage.DATA_FOUND
      );
    } else {
      return response.commonErrorResponse(
        res,
        ErrorCode.WENT_WRONG,
        {},
        ErrorMessage.SOMETHING_WRONG
      );
    }
  } catch (error) {
    return response.commonErrorResponse(
      res,
      ErrorCode.INTERNAL_ERROR,
      [],
      error.message,
      ErrorMessage.INTERNAL_ERROR
    );
  }
}
// ================productRating==================

// Create a new review and rating

module.exports.addReviewRating = async function (req, res) {
  try {
    let data = req.body;
    let user_id = req.user_id; // Assuming user_id is obtained from authentication middleware

    let addedReviewRating = await productReview.create(data);
    if (addedReviewRating) {
      return response.commonResponse(
        res,
        SuccessCode.SUCCESSFULLY_CREATED,
        addedReviewRating,
        SuccessMessage.DATA_SAVED
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

// Get all reviews and ratings
module.exports.getAllReviewRatings = async function (req, res) {
  try {
    let allReviewRatings = await productReview.find();
    if (allReviewRatings?.length > 0) {
      return response.commonResponse(
        res,
        SuccessCode.SUCCESS,
        allReviewRatings,
        SuccessMessage.DATA_FOUND
      );
    } else {
      return response.commonErrorResponse(
        res,
        ErrorCode.BAD_REQUEST,
        [],
        ErrorMessage.NOT_FOUND
      );
    }
  } catch (error) {
    return response.commonErrorResponse(
      res,
      ErrorCode.INTERNAL_ERROR,
      {},
      ErrorMessage.INTERNAL_ERROR
    );
  }
}

// Get a specific review and rating by ID
module.exports.getReviewRatingByProductId = async function (req, res) {
  try {
    let product_id = req.params.product_id;
    let reviewRating = await productReview.find({ product_id: product_id });
    if (reviewRating.length > 0) {
      return response.commonResponse(
        res,
        SuccessCode.SUCCESS,
        reviewRating,
        SuccessMessage.DATA_FOUND
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

// Update a review and rating by ID
module.exports.updateReviewRatingById = async function (req, res) {
  try {
    let reviewRating_id = req.params.reviewRating_id;
    let updatedReviewRating = await productReview.findByIdAndUpdate(
      reviewRating_id,
      req.body,
      { new: true }
    );
    if (updatedReviewRating) {
      return response.commonResponse(
        res,
        SuccessCode.SUCCESS,
        updatedReviewRating,
        SuccessMessage.SUCCESSFULLY_UPDATED
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

// Delete a review and rating by ID
module.exports.deleteReviewRatingById = async function (req, res) {
  try {
    let reviewRating_id = req.params.reviewRating_id;
    let deletedReviewRating = await productReview.findByIdAndDelete(
      reviewRating_id
    );
    if (deletedReviewRating) {
      return response.commonResponse(
        res,
        SuccessCode.SUCCESS,
        deletedReviewRating,
        SuccessMessage.SUCCESSFULLY_DELETED
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

module.exports.getProductByIdWithRating = async function (req, res) {
  try {
    let product_id = req.params.product_id;

    let products = await productModel.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(product_id), // Assuming product_id is a variable
        },
      },

      {
        $lookup: {
          from: "productreviews",
          localField: "_id", // Use the correct field for the local join, assuming _id is the correct field in productModel
          foreignField: "product_id", // Use the correct field for the foreign join in productRatings
          as: "allRatingAndReview",
        },
      },

      {
        $addFields: {
          ratingAVG: { $avg: "$allRatingAndReview.rating" },
        },
      },
      {
        $addFields: {
          count: { $size: "$allRatingAndReview" },
        },
      },

      {
        $group: {
          _id: "$allRatingAndReview.rating",
          productDetails: {
            $push: {
              rating: "$allRatingAndReview",
              ratingAVG: "$ratingAVG",
              count: "$count",
              description: "$description",
              brand: "$brand",

              style: "$style",
              price: "$price",
              discount: "$discount",
              currency: "$currency",
              category: "$category",
              subCategory: "$subCategory",

              name: "$name",
              ratingAVG: "$ratingAVG",
              tags: "$tags",
              dimensions: "$dimensions",
              images: "$images",
              variations: "$variations",
            },
          },
        },
      },
    ]);

    if (products.length) {
      return response.commonResponse(
        res,
        SuccessCode.SUCCESS,
        products,
        SuccessMessage.DATA_FOUND
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

module.exports.addFoodsAndBeveragesProduct = async (req, res) => {
  try {
    const data = req.body;

    // DUE: Data validation 

    let newProduct = new productModel({
      product_name: data.product_name,
      product_description: data.product_description,

      unit_of_measurement: data.unit_of_measurement,

      product_type: data.product_type,
      seller_id: req.seller._id,

    })

    let savedProduct = await newProduct.save();

    let newVariant = new Variant({
      product_id: savedProduct._id,
      actual_price: Number(data.actual_price),
      offered_price: Number(data.offered_price),
      min_order_quantity: Number(data.min_order_quantity),

      manufactured_date: data.manufactured_date,
      expiration_date: data.expiration_date,
      calories: Number(data.calories),
      country_of_origin: data.country_of_origin,

      packaging_type: data.packaging_type,
      brand_name: data.brand_name,
      storage_conditions: data.storage_conditions,

      quantity_type: data.quantity_type
    })

    if (data.quantity_type === "weight") {
      newVariant.unit_of_weight = data.unit_of_weight,
        newVariant.weight_per_unit = Number(data.weight_per_unit)
    } else if (data.quantity_type === "volume") {
      newVariant.unit_of_volume = data.unit_of_volume,
        newVariant.volume_per_unit = Number(data.volume_per_unit)
    }

    let savedVariant = await newVariant.save();

    let newInventory = new Inventory({
      available_quantity: Number(data.quantity),
      inventory_location: data.inventory_location,
      product_variant_id: savedVariant._id
    })

    let savedInventory = await newInventory.save();

    return res.status(201).send({ success: true, message: "Product added successfully", saved_product: savedProduct, saved_variant: savedVariant, saved_inventory: savedInventory });
  } catch (err) {
    console.log("Error while adding food and beverage product", err);
    return res.status(500).send({ success: false, message: "Internal server error" });
  }
}