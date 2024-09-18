require("dotenv").config()
const express= require("express")
const userRoute= require("./router/userRouter")
const productRoute=require("./router/productRouter")
const cartRouter=require("./router/cartRouter")
const sellerRoute=require("./router/sellerRouter")
const adminRoute=require("./router/adminRouter")
const orderRouter=require("./router/orderRouter")
const checkoutRouter=require("./router/checkoutRouter")

const phonepeRoute = require("./router/phonepeRouter");
const invoiceRouter = require("./router/invoiceRouter")

const multer= require("multer")
const cors= require("cors")
const app= express()
app.use(multer().any());
// app.use(express.json());
app.use(express.json({ limit: "1000mb" }));
app.use(express.urlencoded({ extended: true, limit: "1000mb" }));
app.use(
  cors({
    allowedHeaders: ["Content-Type", "token", "authorization"],
    exposedHeaders: ["token", "authorization"],
    origin: "*",
    methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
    preflightContinue: false,
  })
);
require("./dbConnection/dbConnection")

app.use("/app/user/",userRoute)
app.use("/app/product/",productRoute)
app.use("/app/cart/",cartRouter)
app.use("/app/seller/",sellerRoute)
app.use("/app/admin",adminRoute)
app.use("/app/order",orderRouter)
app.use("/app/checkout/",checkoutRouter)  
app.use("/api", phonepeRoute);
app.use("/app",invoiceRouter)


app.listen(process.env.PORT_NUMBER||3687, function(){
  console.log("server is running on port:",process.env.PORT_NUMBER||3687)
})
