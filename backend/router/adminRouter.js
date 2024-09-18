const express= require("express")
const route= express.Router()
const adminController=require("../app/controlllers/adminController")

route.post("/adminLogin",adminController.login)
route.get("/totalUser",adminController.totalUser )
route.get("/totalSeller",adminController.totalSeller)
route.get("/totalOrder",adminController.totalOrder)


module.exports=route