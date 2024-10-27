const express = require("express")
const route = express.Router()
const searchProductController = require("../app/controlllers/searchProductController")

// route.post("/createCart", auth.authorization, cartController.createCart)
// route.get("/getCartData",auth.authorization,cartController.getCartData )
// route.put("/removeItemsToCart/:product_id",auth.authorization,cartController.removeItemsToCart)
// route.delete("/removeCart/:cart_id",auth.authorization,cartController.removeCart )

route.get("/clothing/shirts", searchProductController.getAllShirts)
route.get("/clothing/shirts/view-details", searchProductController.getShirtDetails)

route.get("/get-product", searchProductController.getProduct)
route.get("/default/view-details", searchProductController.viewDefaultProductDetail)


module.exports = route