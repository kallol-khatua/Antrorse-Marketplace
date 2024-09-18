const express= require("express")
const router= express.Router()
const invoiceController= require("../app/controlllers/invoiceController")

router.get("/downloadInvoice",invoiceController.voice1)


module.exports=router