const express= require("express")
const route= express.Router()
const auth=require("../app/middleware/auth")


const productController= require("../app/controlllers/productController")
route.post("/AddProduct",auth.sellerAuth,productController.AddProduct)
route.get("/searchProducts",productController.searchProducts)
route.get("/getProductById/:product_id",productController.getProductById)
route.get("/getAllProductBySellerId",productController.getAllProductBySellerId)
route.get("/getProductBySubcategory",productController.getProductBySubcategory)
route.put("/updateProduct/:product_id",auth.sellerAuth,productController.updateProduct)
route.get("/getProductByIdWithRating/:product_id", productController.getProductByIdWithRating)
// ===========productRating========


// Create a new review and rating
route.post("/review-ratings",auth.authorization, productController.addReviewRating);

// Get all reviews and ratings
route.get("/review-ratings", productController.getAllReviewRatings);

// Get a specific review and rating by ID
route.get("/review-ratings/:product_id", productController.getReviewRatingByProductId);

// Update a review and rating by ID
route.put("/review-ratings/:reviewRating_id", productController.updateReviewRatingById);

// Delete a review and rating by ID
route.delete("/review-ratings/:reviewRating_id", productController.deleteReviewRatingById);



module.exports=route