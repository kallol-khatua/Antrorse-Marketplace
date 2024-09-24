require("dotenv").config()
const express = require("express")
const app = express()
const multer = require("multer")
const cors = require("cors")
const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

require("./dbConnection/dbConnection")

// =========== Routes =========== //
const userRoute = require("./router/userRouter")
const productRoute = require("./router/productRouter")
const cartRouter = require("./router/cartRouter")
const sellerRoute = require("./router/sellerRouter")
const adminRoute = require("./router/adminRouter")
const orderRouter = require("./router/orderRouter")
const checkoutRouter = require("./router/checkoutRouter")
const phonepeRoute = require("./router/phonepeRouter");
const invoiceRouter = require("./router/invoiceRouter")

app.use("/api/user", userRoute)
app.use("/api/seller", sellerRoute)
app.use("/api/product", productRoute)
app.use("/api/cart", cartRouter)
app.use("/api/admin", adminRoute)
app.use("/api/order", orderRouter)
app.use("/api/checkout", checkoutRouter)
app.use("/api", phonepeRoute);
app.use("/app", invoiceRouter)


const port = process.env.PORT_NUMBER || 3687;
app.listen(port, function () {
  console.log(`server is running on port: ${port}`)
})
