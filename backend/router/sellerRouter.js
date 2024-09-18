const express= require("express")
const route=express.Router()
const sellerController=require("../app/controlllers/sellerController")
const auth=require("../app/middleware/auth")

route.post("/sellerRegistration",sellerController.sellerRegistration)

route.post("/sendOtpForRegistration",sellerController.sendOtpForRegistration)
route.post("/sellerLogin", sellerController.sellerLogin)
route.put("/updateProfile",auth.authorization, sellerController.updateProfile)
route.put("/forgetPassword",sellerController.forgetPassword)
route.put("/sellerKYC",auth.sellerAuth, sellerController.sellerKYC)

route.post("/createOTPForForgetPassword",sellerController.createOTPForForgetPassword)
module.exports=route