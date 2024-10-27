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
const VariantInventory = require("../models/products/variantInventory")
const Variant = require("../models/products/variant")

const SizeVariant = require("../models/products/sizeVariant")
const SizeVariantInventory = require("../models/products/sizeVariantInventory");
const Product = require("../models/products/product");

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
    // console.log(data)

    if (!req.seller) {
      return res.status(400).send({ success: false, message: "Seller not found" })
    }

    // DUE: Data validation  - first before saving

    let newProduct = new productModel({
      product_name: data.product_name,
      product_description: data.product_description,

      product_type: data.product_type,
      unit_of_measurement: data.unit_of_measurement,

      seller_id: req.seller._id,

      generic_name: data.generic_name,
      pack_of: data.pack_of,
      quantity_type: data.quantity_type,
      model_name: data.model_name,
      type: data.type,
      brand_name: data.brand_name,
      country_of_origin: data.country_of_origin,
      inventory_location: data.inventory_location,
      storage_conditions: data.storage_conditions
    })

    // console.log(newProduct)

    let savedProduct = await newProduct.save();

    for (let i = 0; i < data.variants.length; i++) {
      // console.log(data.variants[i])

      let sku = "SKU";
      sku += Math.floor(10000 + Math.random() * 90000);
      let hsn = Math.floor(10000000 + Math.random() * 90000000);

      let newVariant = new Variant({
        product_id: savedProduct._id,
        actual_price: data.variants[i].actual_price,
        offered_price: data.variants[i].offered_price,
        min_order_quantity: data.variants[i].min_order_quantity,
        manufactured_date: data.variants[i].manufactured_date,
        expiration_date: data.variants[i].expiration_date,
        calories: data.variants[i].calories,
        packaging_type: data.variants[i].packaging_type,

        length: data.variants[i].length,
        breadth: data.variants[i].breadth,
        height: data.variants[i].height,
        weight: data.variants[i].weight,
        sku: sku,
        hsn: hsn,
      })
      if (data.quantity_type === "weight") {
        newVariant.weight_per_unit = data.variants[i].weight_per_unit,
          newVariant.unit_of_weight = data.variants[i].unit_of_weight

      } else if (data.quantity_type === "volume") {
        newVariant.volume_per_unit = data.variants[i].volume_per_unit,
          newVariant.unit_of_volume = data.variants[i].unit_of_volume
      }
      // console.log(newVariant)

      // Save new variant to the db
      const savedVariant = await newVariant.save();

      let newVariantInventory = new VariantInventory({
        product_variant_id: savedVariant._id,
        available_quantity: data.variants[i].quantity
      })

      // console.log(newVariantInventory)
      let savedInventory = await newVariantInventory.save();
    }


    return res.status(201).send({ success: true, message: "Product added successfully" });
  } catch (err) {
    console.log("Error while adding food and beverage product", err);
    return res.status(500).send({ success: false, message: "Internal server error" });
  }
}

module.exports.addClothingsProduct = async (req, res) => {
  try {
    const data = req.body;
    // console.log(data)
    // DUE: Data validation 

    if (!req.seller) {
      return res.status(400).send({ success: false, message: "Seller not found" })
    }

    let newProduct = new productModel({
      product_name: data.product_name,
      product_description: data.product_description,

      product_type: data.product_type,
      unit_of_measurement: data.unit_of_measurement,

      seller_id: req.seller._id,

      generic_name: data.generic_name,
      pack_of: data.pack_of,
      fit: data.fit,
      fabric: data.fabric,
      fabric_care: data.fabric_care,
      suitable_for: data.suitable_for,
      brand_name: data.brand_name,
      country_of_origin: data.country_of_origin,
      ideal_for: data.ideal_for,
      is_returnable: data.is_returnable,
      return_within_days: data.return_within_days,
      returnable_condition: data.returnable_condition,
      min_order_quantity: data.min_order_quantity,
      inventory_location: data.inventory_location,
    })

    if (data.generic_name === "Casual Shirts" ||
      data.generic_name === "Formal Shirts" ||
      data.generic_name === "T-Shirts") {
      newProduct.sleeve = data.sleeve,
        newProduct.pattern = data.pattern,
        newProduct.reversible = data.reversible
    }

    if (data.generic_name === "Casual Shirts" ||
      data.generic_name === "Formal Shirts") {
      newProduct.closure = data.closure,
        newProduct.collar = data.collar,
        newProduct.hem = data.hem
    }

    if (data.generic_name === "T-Shirts") {
      newProduct.neck_type = data.neck_type
    }

    // save product info to db
    const savedProduct = await newProduct.save();

    for (let i = 0; i < data.variants.length; i++) {
      // console.log(data.variants[i])

      let newVariant = new Variant({
        product_id: savedProduct._id,
        primary_color: data.variants[i].primary_color,
        secondary_color: data.variants[i].secondary_color,
      })

      // Save new variant to the db
      const savedVariant = await newVariant.save();

      // sizes and their details of a variant
      const sizeVariants = data.variants[i].size_variants

      for (let j = 0; j < sizeVariants.length; j++) {
        // console.log(sizeVariants[j])
        let sku = "SKU";
        sku += Math.floor(10000 + Math.random() * 90000);
        let hsn = Math.floor(10000000 + Math.random() * 90000000);

        const newSizeVariant = new SizeVariant({
          product_variant_id: savedVariant._id,
          size: sizeVariants[j].size,
          actual_price: sizeVariants[j].actual_price,
          offered_price: sizeVariants[j].offered_price,

          length: sizeVariants[j].length,
          breadth: sizeVariants[j].breadth,
          height: sizeVariants[j].height,
          weight: sizeVariants[j].weight,
          sku: sku,
          hsn: hsn,
        })

        // save size variant to db
        const savedSizeVariant = await newSizeVariant.save();


        const newSizeVariantInventory = new SizeVariantInventory({
          size_variant_id: savedSizeVariant._id,
          available_quantity: sizeVariants[j].quantity,
        })

        // save size variant inventry to db
        const savedSizeVariantInventory = await newSizeVariantInventory.save();
      }
    }

    return res.status(201).send({ success: true, message: "Product added successfully" });
  } catch (err) {
    console.log("Error while adding clothings product", err);
    return res.status(500).send({ success: false, message: "Internal server error" });
  }
}

module.exports.addDefaultProduct = async (req, res) => {
  try {
    const data = req.body;
    if (!req.seller) {
      return res.status(400).send({ success: false, message: "Seller not found" })
    }
    // DUE: Data validation  - first before saving

    let newProduct = new productModel({
      product_name: data.product_name,
      product_description: data.product_description,

      product_type: data.product_type,

      seller_id: req.seller._id,

      generic_name: data.generic_name,
      inventory_location: data.inventory_location,
      quantity_type: data.quantity_type,
      model_name: data.model_name,
      type: data.type,
      specifications: data.specifications,
      brand_name: data.brand_name,
      country_of_origin: data.country_of_origin,
    })

    // console.log(newProduct)

    let savedProduct = await newProduct.save();

    for (let i = 0; i < data.variants.length; i++) {
      // console.log(data.variants[i])
      let sku = "SKU";
      sku += Math.floor(10000 + Math.random() * 90000);
      let hsn = Math.floor(10000000 + Math.random() * 90000000);

      let newVariant = new Variant({
        product_id: savedProduct._id,
        actual_price: data.variants[i].actual_price,
        offered_price: data.variants[i].offered_price,
        min_order_quantity: data.variants[i].min_order_quantity,

        length: data.variants[i].length,
        breadth: data.variants[i].breadth,
        height: data.variants[i].height,
        weight: data.variants[i].weight,
        sku: sku,
        hsn: hsn,
      })

      // Save new variant to the db
      const savedVariant = await newVariant.save();

      let newVariantInventory = new VariantInventory({
        product_variant_id: savedVariant._id,
        available_quantity: data.variants[i].quantity
      })

      // console.log(newVariantInventory)
      let savedInventory = await newVariantInventory.save();
    }

    return res.status(201).send({ success: true, message: "Product added successfully" });
  } catch (err) {
    console.log("Error while adding clothings product", err);
    return res.status(500).send({ success: false, message: "Internal server error" });
  }
}

module.exports.addDefaultAdminProduct = async (req, res) => {
  try {
    const data = req.body;

    // DUE: Data validation  - first before saving

    let newProduct = new productModel({
      product_name: data.product_name,
      product_description: data.product_description,

      product_type: data.product_type,

      is_admin_product: true,
      admin_id: req.admin._id,
      isApproved: true,
      isActive: true,

      generic_name: data.generic_name,
      inventory_location: data.inventory_location,
      quantity_type: data.quantity_type,
      model_name: data.model_name,
      type: data.type,
      specifications: data.specifications,
      brand_name: data.brand_name,
      country_of_origin: data.country_of_origin,
    })

    // console.log(newProduct)

    let savedProduct = await newProduct.save();

    for (let i = 0; i < data.variants.length; i++) {
      // console.log(data.variants[i])
      let sku = "SKU";
      sku += Math.floor(10000 + Math.random() * 90000);
      let hsn = Math.floor(10000000 + Math.random() * 90000000);

      let newVariant = new Variant({
        product_id: savedProduct._id,
        actual_price: data.variants[i].actual_price,
        offered_price: data.variants[i].offered_price,
        min_order_quantity: data.variants[i].min_order_quantity,

        length: data.variants[i].length,
        breadth: data.variants[i].breadth,
        height: data.variants[i].height,
        weight: data.variants[i].weight,
        sku: sku,
        hsn: hsn,
      })

      // console.log(newVariant)

      // Save new variant to the db
      const savedVariant = await newVariant.save();

      let newVariantInventory = new VariantInventory({
        product_variant_id: savedVariant._id,
        available_quantity: data.variants[i].quantity
      })

      // console.log(newVariantInventory)
      let savedInventory = await newVariantInventory.save();
    }

    return res.status(201).send({ success: true, message: "Product added successfully" });
  } catch (err) {
    console.log("Error while adding clothings product", err);
    return res.status(500).send({ success: false, message: "Internal server error" });
  }
}

module.exports.addFoodsAndBeveragesAdminProduct = async (req, res) => {
  try {
    const data = req.body;
    // console.log(data)

    // DUE: Data validation  - first before saving

    let newProduct = new productModel({
      product_name: data.product_name,
      product_description: data.product_description,

      product_type: data.product_type,
      unit_of_measurement: data.unit_of_measurement,

      is_admin_product: true,
      admin_id: req.admin._id,
      isApproved: true,
      isActive: true,

      generic_name: data.generic_name,
      pack_of: data.pack_of,
      quantity_type: data.quantity_type,
      model_name: data.model_name,
      type: data.type,
      brand_name: data.brand_name,
      country_of_origin: data.country_of_origin,
      inventory_location: data.inventory_location,
      storage_conditions: data.storage_conditions
    })

    // console.log(newProduct)

    let savedProduct = await newProduct.save();

    for (let i = 0; i < data.variants.length; i++) {
      // console.log(data.variants[i])
      let sku = "SKU";
      sku += Math.floor(10000 + Math.random() * 90000);
      let hsn = Math.floor(10000000 + Math.random() * 90000000);

      let newVariant = new Variant({
        product_id: savedProduct._id,
        actual_price: data.variants[i].actual_price,
        offered_price: data.variants[i].offered_price,
        min_order_quantity: data.variants[i].min_order_quantity,
        manufactured_date: data.variants[i].manufactured_date,
        expiration_date: data.variants[i].expiration_date,
        calories: data.variants[i].calories,
        packaging_type: data.variants[i].packaging_type,

        length: data.variants[i].length,
        breadth: data.variants[i].breadth,
        height: data.variants[i].height,
        weight: data.variants[i].weight,
        sku: sku,
        hsn: hsn,
      })
      if (data.quantity_type === "weight") {
        newVariant.weight_per_unit = data.variants[i].weight_per_unit,
          newVariant.unit_of_weight = data.variants[i].unit_of_weight

      } else if (data.quantity_type === "volume") {
        newVariant.volume_per_unit = data.variants[i].volume_per_unit,
          newVariant.unit_of_volume = data.variants[i].unit_of_volume
      }
      // console.log(newVariant)

      // Save new variant to the db
      const savedVariant = await newVariant.save();

      let newVariantInventory = new VariantInventory({
        product_variant_id: savedVariant._id,
        available_quantity: data.variants[i].quantity
      })

      // console.log(newVariantInventory)
      let savedInventory = await newVariantInventory.save();
    }


    return res.status(201).send({ success: true, message: "Product added successfully" });
  } catch (err) {
    console.log("Error while adding food and beverage product", err);
    return res.status(500).send({ success: false, message: "Internal server error" });
  }
}

module.exports.addClothingsAdminProduct = async (req, res) => {
  try {
    const data = req.body;
    // console.log(data)
    // DUE: Data validation 

    let newProduct = new productModel({
      product_name: data.product_name,
      product_description: data.product_description,

      product_type: data.product_type,
      unit_of_measurement: data.unit_of_measurement,

      is_admin_product: true,
      admin_id: req.admin._id,
      isApproved: true,
      isActive: true,

      generic_name: data.generic_name,
      pack_of: data.pack_of,
      fit: data.fit,
      fabric: data.fabric,
      fabric_care: data.fabric_care,
      suitable_for: data.suitable_for,
      brand_name: data.brand_name,
      country_of_origin: data.country_of_origin,
      ideal_for: data.ideal_for,
      is_returnable: data.is_returnable,
      return_within_days: data.return_within_days,
      returnable_condition: data.returnable_condition,
      min_order_quantity: data.min_order_quantity,
      inventory_location: data.inventory_location,
    })

    if (data.generic_name === "Casual Shirts" ||
      data.generic_name === "Formal Shirts" ||
      data.generic_name === "T-Shirts") {
      newProduct.sleeve = data.sleeve,
        newProduct.pattern = data.pattern,
        newProduct.reversible = data.reversible
    }

    if (data.generic_name === "Casual Shirts" ||
      data.generic_name === "Formal Shirts") {
      newProduct.closure = data.closure,
        newProduct.collar = data.collar,
        newProduct.hem = data.hem
    }

    if (data.generic_name === "T-Shirts") {
      newProduct.neck_type = data.neck_type
    }

    // save product info to db
    const savedProduct = await newProduct.save();

    for (let i = 0; i < data.variants.length; i++) {
      // console.log(data.variants[i])

      let newVariant = new Variant({
        product_id: savedProduct._id,
        primary_color: data.variants[i].primary_color,
        secondary_color: data.variants[i].secondary_color,
      })

      // Save new variant to the db
      const savedVariant = await newVariant.save();

      // sizes and their details of a variant
      const sizeVariants = data.variants[i].size_variants

      for (let j = 0; j < sizeVariants.length; j++) {
        // console.log(sizeVariants[j])
        let sku = "SKU";
        sku += Math.floor(10000 + Math.random() * 90000);
        let hsn = Math.floor(10000000 + Math.random() * 90000000);

        const newSizeVariant = new SizeVariant({
          product_variant_id: savedVariant._id,
          size: sizeVariants[j].size,
          actual_price: sizeVariants[j].actual_price,
          offered_price: sizeVariants[j].offered_price,

          length: sizeVariants[j].length,
          breadth: sizeVariants[j].breadth,
          height: sizeVariants[j].height,
          weight: sizeVariants[j].weight,
          sku: sku,
          hsn: hsn,
        })

        // save size variant to db
        const savedSizeVariant = await newSizeVariant.save();


        const newSizeVariantInventory = new SizeVariantInventory({
          size_variant_id: savedSizeVariant._id,
          available_quantity: sizeVariants[j].quantity,
        })

        // save size variant inventry to db
        const savedSizeVariantInventory = await newSizeVariantInventory.save();
      }
    }

    return res.status(201).send({ success: true, message: "Product added successfully" });
  } catch (err) {
    console.log("Error while adding clothings product", err);
    return res.status(500).send({ success: false, message: "Internal server error" });
  }
}

module.exports.getProductCategory = async (req, res) => {
  try {
    let { productId } = req.query;

    const productDetail = await Product.findOne({ _id: productId })
    return res.status(200).send({ success: true, message: "Product category found", productDetail });
  } catch (error) {
    console.log("Error while fetching product category");
    return res.status(500).send({ success: false, message: "Internal server error" });
  }
}

module.exports.getClothingOrderDetail = async (req, res) => {
  try {
    let { productId, variantId, sizeVariantId } = req.query;
    const productDetail = await Product.findOne({ _id: productId })

    const variantDetail = await Variant.findOne({ _id: variantId, product_id: productDetail._id })

    const sizeVariantDetail = await SizeVariant.findOne({ _id: sizeVariantId, product_variant_id: variantDetail._id });

    const sizevariantInventory = await SizeVariantInventory.findOne({ size_variant_id: sizeVariantDetail._id })

    return res.status(200).send({ success: true, message: "Details fetched", productDetail, variantDetail, sizeVariantDetail, sizevariantInventory });
  } catch (error) {
    console.log("Error while fetching Clothing order detail");
    return res.status(500).send({ success: false, message: "Internal server error" });
  }
}

module.exports.getSellerDetail = async (req, res) => {
  try {
    let { productId } = req.query;

    const details = await Product.findOne({ _id: productId })
    if (details.is_admin_product) {
      const adminDetails = await Product.findOne({ _id: productId }).populate("admin_id")
      return res.status(200).send({ success: true, message: "Details fetched", adminDetails: adminDetails.admin_id });
    } else {
      const sellerDetails = await Product.findOne({ _id: productId }).populate("seller_id")
      return res.status(200).send({
        success: true, message: "Details fetched", sellerDetails: sellerDetails.
          seller_id
      });
    }
  } catch (error) {
    console.log("Error while fetching seller detail for product id");
    return res.status(500).send({ success: false, message: "Internal server error" });
  }
}

module.exports.getDefaultOrderDetail = async (req, res) => {
  try {
    const { productId, variantId } = req.query;
    const productDetail = await Product.findOne({ _id: productId });
    if (!productDetail) {
      return res.status(400).send({ success: false, message: "Wrong detail provided" })
    }

    const variantDetail = await Variant.findOne({ _id: variantId });
    if (!variantDetail) {
      return res.status(400).send({ success: false, message: "Wrong detail provided" })
    }

    const variantInventoryDetail = await VariantInventory.findOne({ product_variant_id: variantId });
    if (!variantInventoryDetail) {
      return res.status(400).send({ success: false, message: "Wrong detail provided" })
    }

    return res.status(200).send({ success: true, message: "Details fetched", productDetail, variantDetail, variantInventoryDetail });
  } catch (error) {
    console.log("Error while fetching seller detail for product id");
    return res.status(500).send({ success: false, message: "Internal server error" });
  }
}