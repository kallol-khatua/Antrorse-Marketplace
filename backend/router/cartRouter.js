const express= require("express")
const route= express.Router()
const cartController=require("../app/controlllers/cartController")
const auth=require("../app/middleware/auth")

route.post("/createCart", auth.authorization, cartController.createCart)
route.get("/getCartData",auth.authorization,cartController.getCartData )
route.put("/removeItemsToCart/:product_id",auth.authorization,cartController.removeItemsToCart)
route.delete("/removeCart/:cart_id",auth.authorization,cartController.removeCart )


module.exports=route