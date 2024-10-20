require("dotenv").config()
const express = require("express")
const app = express()
const multer = require("multer")
const cors = require("cors")
const bodyParser = require("body-parser")
const bcrypt = require("bcrypt");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const Admin = require("./app/models/admin/admin")

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
const searchProductRouter = require("./router/searchProduct")

app.use("/api/user", userRoute)
app.use("/api/seller", sellerRoute)

app.use("/api/product", productRoute)
app.use("/api/search-product", searchProductRouter)

app.use("/api/cart", cartRouter)

app.use("/api/admin", adminRoute)

app.use("/api/order", orderRouter)
app.use("/api/checkout", checkoutRouter)

app.use("/api", phonepeRoute);
// app.use("/app", invoiceRouter)

// app.post("/api/create-admin", async (req, res) => {
//   try {
//     const { name, email, mobile_number, password } = req.body;

//     const findAdminByEmail = await Admin.findOne({ email: email });
//     if (findAdminByEmail) {
//       return res.status(400).send({ success: false, message: "Admin with this email already exist" });
//     }

//     const findAdminByMobileNumber = await Admin.findOne({ mobile_number: mobile_number });
//     if (findAdminByMobileNumber) {
//       return res.status(400).send({ success: false, message: "Admin with this mobile number already exist" });
//     }

//     const salt = await bcrypt.genSalt(Number(process.env.SALT));
//     const hashedPassword = await bcrypt.hash(password, salt);

//     const newAdmin = new Admin({
//       name, email, mobile_number, password: hashedPassword
//     })

//     await newAdmin.save();

//     return res.status(201).send({ success: true, message: "Admin created successfully" });
//   } catch (error) {
//     console.log("Error while creating admin")
//     return res.status(500).send({ success: false, message: "Internal server error" });
//   }
// })

const port = process.env.PORT_NUMBER || 3687;
app.listen(port, function () {
  console.log(`server is running on port: ${port}`)
})
