require("dotenv").config()
const express = require("express")
const app = express()
const fs = require("fs");
const path = require("path");
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
const SizeVariant = require("./app/models/products/sizeVariant")

app.use("/api/user", userRoute)
app.use("/api/seller", sellerRoute)

app.use("/api/product", productRoute)
app.use("/api/search-product", searchProductRouter)

app.use("/api/cart", cartRouter)

app.use("/api/admin", adminRoute)

app.use("/api/order", orderRouter)
app.use("/api/checkout", checkoutRouter)

app.use("/api", phonepeRoute);


const uploadDirectory = path.join(__dirname, "uploads");

// Check if the uploads directory exists, and create it if it doesn't
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}

// Set up Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Define fields for conditional uploads
const uploadFields = [
  { name: "aadhaarFile", maxCount: 1 },
  { name: "panFile", maxCount: 1 },
  { name: "gstFile", maxCount: 1 },
  { name: "fssaiFile", maxCount: 1 },
  { name: "trademarkFile", maxCount: 1 },
];

app.post("/api/upload-documents", upload.fields(uploadFields), (req, res) => {
  try {
    console.log(req.files);

    // Access form data
    const {
      aadhaarNumber,
      panNumber,
      gstNumber,
      trademarkBrandName,
      additionalBrands,
    } = req.body;

    // Files available in req.files
    const { aadhaarFile, panFile, gstFile, fssaiFile, trademarkFile } = req.files;

    // Additional brand NOC files if any
    const brandNOCs = req.files.additionalBrands?.map((brand, index) => ({
      brandName: req.body[`additionalBrands[${index}][brandName]`],
      nocFile: brand.path,
    }));

    let data = {
      aadhaarNumber,
      aadhaarFile: aadhaarFile?.[0].path,
      panNumber,
      panFile: panFile?.[0].path,
      gstNumber,
      gstFile: gstFile?.[0].path,
      fssaiFile: fssaiFile?.[0].path,
      trademarkBrandName,
      trademarkFile: trademarkFile?.[0].path,
      additionalBrands: brandNOCs,
    };
    console.log(data)

    res.status(200).json({ message: 'Files uploaded successfully' });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Failed to upload files" });
  }
});

const port = process.env.PORT_NUMBER || 3687;
app.listen(port, function () {
  console.log(`server is running on port: ${port}`)
})
