const express= require("express")
const router= express.Router()
const userController= require("../app/controlllers/userController")
const wishlistController= require("../app/controlllers/wishListController")
const auth=require("../app/middleware/auth")

router.post("/registration", userController.register)
router.post("/sendOtpForRegistration",userController.sendOtpForRegistration)
router.post("/login", userController.login)
router.post("/loginWithOTP", userController.loginWithOTP)
router.put("/updateProfile",auth.authorization, userController.updateProfile)
router.put("/forgetPassword",userController.forgetPassword)
router.delete("/userDeleteProfile",auth.authorization,userController.userDeleteProfile)
router.get("/getUser",auth.authorization, userController.getUser)
// ===================== this use according to use=============
router.post("/createOTPForForgetPassword",userController.createOTPForForgetPassword)
// ======================================================================
router.post("/createAddress",auth.authorization,userController.createAddress)
router.get("/getAddress",auth.authorization,userController.getAddress)
// ================wishList=============
router.post("/createWishList", auth.authorization, wishlistController.createWishList)
router.get("/getWishList",auth.authorization,wishlistController.getWishList )
router.put("/removeFromWishlist/:product_id",auth.authorization,wishlistController.removeFromWishlist)

// ==============
module.exports=router