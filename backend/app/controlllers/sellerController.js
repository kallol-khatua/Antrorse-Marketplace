const sellerModel = require("../models/seller/sellerModels");
const response = require("../helper/commonResponse");
const jwt = require("jsonwebtoken");
const { SuccessMessage, ErrorMessage } = require("../helper/message");
const { ErrorCode, SuccessCode } = require("../helper/statusCode");
const validation = require("../helper/validation");
const commonFunction = require("../helper/commonFunction");
const bcrypt = require("bcrypt");
const { uploadFile } = require("../middleware/AWS");
const SellerPickupLocation = require("../models/seller/sellerPickupLocation");
const { default: axios } = require("axios");
const OrderItem = require("../models/orders/orderItem");
const { default: mongoose } = require("mongoose");
const ShiprocketDetail = require("../models/orders/shiprocketDetail");

module.exports.sellerRegistration = async function (req, res) {
  try {
    const data = req.body;

    if (!data.isAcceptTermsAndConditions) {
      return res.status(400).send({ success: false, message: "Please accept terms and conditions" })
    }

    // if (!data.gst_number) {
    //   return res.status(400).send({ success: false, message: "GST number is required" });
    // }

    // if (!validation.gstValidation(data.gst_number)) {
    //   return res.status(400).send({ success: false, message: "GST number is not valid" });
    // }

    if (!validation.isNonEmptyString(data.name)) {
      return res.status(400).send({ success: false, message: "Name is required" });
    }

    if (!data.company_name) {
      return res.status(400).send({ success: false, message: "Company name is required" });
    }

    if (!validation.isNonEmptyString(data.company_name)) {
      return res.status(400).send({ success: false, message: "Company name is not valid" });
    }

    if (!data.mobile_number) {
      return res.status(400).send({ success: false, message: "Mobile number is required" });
    }

    if (
      !validation.isValidMobileNumber(data.mobile_number)
    ) {
      return res.status(400).send({ success: false, message: ErrorMessage.PHONE_EMPTY });
    }

    if (!data.email) {
      return res.status(400).send({ success: false, message: "Email is required" });
    }

    if (!validation.isValidEmail(data.email)) {
      return res.status(400).send({ success: false, message: ErrorMessage.INVALID_EMAIL });
    }

    let checkedMobileNumberUnique = await sellerModel.findOne({
      mobile_number: data.mobile_number,
    });

    if (checkedMobileNumberUnique) {
      return res.status(400).send({ success: false, message: "Mobile number already registered" });
    }

    let checkEmailUnique = await sellerModel.findOne({
      email: data.email,
    })

    if (checkEmailUnique) {
      return res.status(400).send({ success: false, message: "Email already registered" });
    }

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashedPassword = await bcrypt.hash(data.password, salt);

    let newSeller = new sellerModel({
      name: data.name,
      email: data.email,
      mobile_number: Number(data.mobile_number),
      password: hashedPassword,
      company_name: data.company_name,
      isAcceptTermsAndConditions: Boolean(data.isAcceptTermsAndConditions),
      // gst_number: data.gst_number,
    });

    let registeredSeller = await newSeller.save();

    return res.status(201).send({ success: true, message: "Account created successfully" });
  } catch (err) {
    console.log("Error while creating new seller account", err);
    return res.status(500).send({ success: false, message: "Internal server error" });
  }
}

module.exports.sellerLogin = async function (req, res) {
  try {
    let data = req.body;
    if (!data.password) {
      return res.status(400).send({ success: false, message: "Password is required" })
    }
    if (!data.mobile_number) {
      return res.status(400).send({ success: false, message: "Mobile number is required" })
    }

    let seller = await sellerModel.findOne({
      mobile_number: data.mobile_number,
    });

    if (!seller) {
      return res.status(400).send({ success: false, message: "Invalid mobile number" })
    }

    if (!seller.isMobileNumberVerified) {
      return res.status(400).send({ success: false, message: "Mobile number is not verified" })
    }

    if (!seller.isEmailVerified) {
      return res.status(400).send({ success: false, message: "Email address is not verified" })
    }

    const matchPass = await bcrypt.compare(data.password, seller.password);
    if (!matchPass) {
      return res.status(400).send({ message: 'Invalid password.' });
    }

    if (!seller.isActive) {
      return res.status(400).send({ success: false, message: "Account is not active" })
    }

    let authToken = seller.generateAuthToken();

    if (authToken) {
      return res.status(200).send({ success: true, message: "Login successfully", authToken });
    }
  } catch (err) {
    console.log("Error while login seller", err);
    return res.status(500).send({ success: false, message: "Internal server error" });
  }
}

module.exports.createPickupLocation = async (req, res) => {
  try {
    const {
      pickup_location,
      address,
      address_2,
      city,
      state,
      country,
      pin_code,
    } = req.body;


    const authRespose = await axios.post(`${process.env.SHIPROCKET_BASE_URL}/auth/login`, {
      email: process.env.SHIPROCKET_EMAIL,
      password: process.env.SHIPROCKET_PASSWORD,
    })

    const data = {
      pickup_location,
      name: req.seller.name,
      email: req.seller.email,
      phone: req.seller.mobile_number,
      address,
      address_2,
      city,
      state,
      country,
      pin_code,
    }

    const response = await axios.post(`${process.env.SHIPROCKET_BASE_URL}/settings/company/addpickup`, data, {
      headers: {
        'Authorization': `Bearer ${authRespose.data.token}`,
        'Content-Type': 'application/json'
      }
    });

    // console.log(response)
    // console.log(response.data);

    if (response.status === 200) {
      seller = req.seller;
      seller.pickup_id = response.data.pickup_id;
      seller.rto_address_id = response.data.address.rto_address_id;
      seller.pickup_location = response.data.address.pickup_code;
      seller.isPickUpLocationAdded = true;

      await seller.save();

      const newPickUplocation = new SellerPickupLocation({
        seller_id: req.seller._id,
        pickup_location,
        address,
        address_2,
        city,
        state,
        country,
        pin_code,
      })

      const savedPickupLocation = await newPickUplocation.save();

      return res.status(201).send({ success: true, message: "Pickup location created successfully", savedPickupLocation });
    } else {
      return res.status(400).send({ success: false, message: "Some error occured" })
    }
  } catch (error) {
    // console.log(error?.response?.data)
    if (error?.response?.data?.status_code === 422) {
      return res.status(422).send({ success: false, message: error.response.data.message, errors: error.response.data.errors })
    }

    console.log("Error while creating seller pickup location", error);
    return res.status(500).send({ success: false, message: "Internal server error" });
  }
}

module.exports.sendOtpForRegistration = async function (req, res) {
  try {
    let data = req.body;

    if (
      !data.mobile_number ||
      !validation.isValidMobileNumber(data.mobile_number)
    ) {
      return response.commonErrorResponse(
        res,
        ErrorCode.BAD_REQUEST,
        {},
        ErrorMessage.PHONE_EMPTY
      );
    }
    let checkNumber = await sellerModel.findOne({
      mobile_number: data.mobile_number,
    });
    if (checkNumber) {
      return response.commonErrorResponse(
        res,
        ErrorCode.ALREADY_EXIST,
        {},
        ErrorMessage.MOBILE_EXIST
      );
    }
    // this function for 6 digit otp create
    let otp = commonFunction.generateOTP();
    console.log(otp);
    //  here function for send otp on mobile number

    return response.commonResponse(
      res,
      SuccessCode.SUCCESSFULLY_CREATED,
      otp,
      SuccessMessage.OTP_SEND
    );
  } catch (error) {
    return response.commonErrorResponse(
      res,
      ErrorCode.INTERNAL_ERROR,
      {},
      error.message
    );
  }
}

module.exports.createOTPForForgetPassword = async function (req, res) {
  try {
    let mobile_number = req.body.mobile_number;
    if (!mobile_number || !validation.isValidMobileNumber(mobile_number)) {
      return response.commonErrorResponse(
        res,
        ErrorCode.BAD_REQUEST,
        {},
        ErrorMessage.PHONE_EMPTY
      );
    }

    let userData = await sellerModel.findOne({
      mobile_number: mobile_number,
    });
    if (!userData) {
      return response.commonErrorResponse(
        res,
        ErrorCode.BAD_REQUEST,
        {},
        ErrorMessage.USER_NOT_FOUND
      );
    }
    let OTP = commonFunction.generateOTP();

    // here function for send  the otp on number
    return response.commonResponse(
      res,
      SuccessCode.SUCCESS,
      OTP,
      SuccessMessage.OTP_SEND
    );
  } catch (err) {
    return response.commonErrorResponse(
      res,
      ErrorCode.INTERNAL_ERROR,
      {},
      err
    );
  }
}

module.exports.forgetPassword = async function (req, res) {
  try {
    let data = req.body;

    if (
      !data.mobile_number ||
      !validation.isValidMobileNumber(data.mobile_number)
    ) {
      return response.commonErrorResponse(
        res,
        ErrorCode.BAD_REQUEST,
        {},
        ErrorMessage.PHONE_EMPTY
      );
    }
    if (data.password) {
      const saltRounds = 10;
      const hash = await bcrypt.hash(data.password, saltRounds);
      data.password = hash;
    }
    let updatePassword = await sellerModel.findOneAndUpdate(
      { mobile_number: data.mobile_number },
      { $set: { password: data.password } },
      { new: true }
    );
    if (updatePassword) {
      return response.commonResponse(
        res,
        SuccessCode.SUCCESS,
        updatePassword.password,
        SuccessMessage.UPDATE_SUCCESS
      );
    } else {
      return response.commonErrorResponse(
        res,
        ErrorCode.NOT_FOUND,
        {},
        ErrorMessage.USER_NOT_FOUND
      );
    }
  } catch (err) {
    return response.commonErrorResponse(
      res,
      ErrorCode.INTERNAL_ERROR,
      {},
      err.message
    );
  }
}

module.exports.updateProfile = async function (req, res) {
  try {
    let data = req.body;
    let files = req.files;

    if (!data && !files) {
      return response.commonErrorResponse(
        res,
        ErrorCode.BAD_REQUEST,
        "",
        "some data need for update"
      );
    }
    let updateData = {};
    if (data.password) {
      const saltRounds = 10;
      const hash = await bcrypt.hash(data.password, saltRounds);
      updateData.password = hash;
    }
    if (data.DOB) {
      updateData.DOB = data.DOB;
    }

    let newUpdateData = {
      password: updateData.password,
      DOB: data.DOB,
      account_details: {
        account_Number: data.account_Number,
        account_holder_name: data.account_holder_name,
        IFC_code: data.IFC_code,
      },
      security_questions: data.security_questions,
      secret_answers: data.secret_answers,
    };

    let updated = await sellerModel.findOneAndUpdate(
      { _id: req.seller_id },

      { $set: newUpdateData },
      { new: true }
    );

    if (updated) {
      return response.commonResponse(
        res,
        SuccessCode.SUCCESS,
        updated,
        SuccessMessage.PROFILE_DETAILS
      );
    } else {
      return response.commonErrorResponse(
        res,
        ErrorCode.WENT_WRONG,
        {},
        ErrorMessage.SOMETHING_WRONG
      );
    }
  } catch (err) {
    return response.commonErrorResponse(
      res,
      ErrorCode.INTERNAL_ERROR,
      {},
      err.message
    );
  }
}

module.exports.sellerKYC = async function (req, res) {
  try {
    let data = req.body;
    let files = req.files;
    let seller_id = req.seller_id;
    if (files?.length > 0) {
      let img = await uploadFile(files[0]);
      data.aadhar_image = img;
    }

    if (
      !data.aadhar_number ||
      !validation.isValidAadharNumber(data.aadhar_number)
    ) {
      return response.commonErrorResponse(
        res,
        ErrorCode.BAD_REQUEST,
        {},
        ErrorMessage.INVALID_AADHAR
      );
    }

    if (!data.fullName) {
      return response.commonErrorResponse(
        res,
        ErrorCode.BAD_REQUEST,
        {},
        ErrorMessage.NAME_EMPTY
      );
    }
    if (!data.GST || !validation.gstValidation(data.GST)) {
      return response.commonErrorResponse(
        res,
        ErrorCode.BAD_REQUEST,
        {},
        ErrorMessage.INVALID_GST
      );
    }
    if (
      !data.mobile_number ||
      !validation.isValidMobileNumber(data.mobile_number)
    ) {
      return response.commonErrorResponse(
        res,
        ErrorCode.BAD_REQUEST,
        {},
        ErrorMessage.INVALID_MOBILE
      );
    }
    if (
      !data.company_pan_number ||
      !validation.isValidPAN(data.company_pan_number)
    ) {
      return response.commonErrorResponse(
        res,
        ErrorCode.BAD_REQUEST,
        {},
        ErrorMessage.INVALID_PAN
      );
    }
    if (
      !data.company_tan_number ||
      !validation.isValidTAN(data.company_tan_number)
    ) {
      return response.commonErrorResponse(
        res,
        ErrorCode.BAD_REQUEST,
        {},
        ErrorMessage.TAN
      );
    }

    // here function for imageupload on cloud
    let checkSellerApproval = await sellerModel.findOne({ _id: seller_id });
    if (checkSellerApproval.sellerApproval == "APPROVED") {
      return response.commonErrorResponse(
        res,
        ErrorCode.BAD_REQUEST,
        {},
        "your already kYC done"
      );
    }
    let updatedKYC = await sellerModel.findOneAndUpdate(
      { _id: seller_id },
      { $set: data },
      { new: true }
    );

    if (updatedKYC) {
      return response.commonResponse(
        res,
        SuccessCode.SUCCESS,
        updatedKYC,
        SuccessMessage.PROFILE_DETAILS
      );
    } else {
      return response.commonErrorResponse(
        res,
        ErrorCode.WENT_WRONG,
        {},
        ErrorMessage.SOMETHING_WRONG
      );
    }
  } catch (err) {
    return response.commonErrorResponse(
      res,
      ErrorCode.INTERNAL_ERROR,
      {},
      err.message
    );
  }
}

module.exports.getAllOrders = async (req, res) => {
  try {
    const orderItems = await OrderItem.aggregate([
      {
        $lookup: {
          from: 'orders',
          localField: 'order_id',
          foreignField: '_id',
          as: 'orderDetails'
        }
      },
      {
        $lookup: {
          from: 'products',
          localField: 'product_id',
          foreignField: '_id',
          as: 'productDetails'
        }
      },
      {
        $match: {
          $and: [
            {
              'is_canceled': false,
            },
            {
              'is_awb_generated': false
            },
            {
              'productDetails.seller_id': new mongoose.Types.ObjectId(req.seller._id)
            },
            {
              'orderDetails.is_order_placed': true,
            }
          ]
        }
      },
      {
        $unwind: '$productDetails', // Flatten the orderDetails array
      },
      {
        $unwind: '$orderDetails', // Flatten the orderDetails array
      },
      {
        $lookup: {
          from: 'variants',
          localField: 'variant_id',
          foreignField: '_id',
          as: 'varinatDetails'
        }
      },
      {
        $unwind: '$varinatDetails', // Flatten the orderDetails array
      },
      {
        $lookup: {
          from: 'sizevariants',
          localField: 'sizeVariantId',
          foreignField: '_id',
          as: 'sizeVariantDetails'
        }
      },
      // {
      //   $unwind: '$sizeVariantDetails', // Flatten the orderDetails array
      // },
      {
        $project: {
          _id: 1,
          productDetails: 1,
          varinatDetails: 1,
          sizeVariantDetails: 1,
          orderDetails: 1,
          short_order_id: 1,
          price: 1,
          is_canceled: 1,
          quantity: 1,
          subTotalPrice: 1,
          is_invoice_generated: 1,
          is_cod: 1,
          is_payment_success: 1,
          order_payment_type: 1,
          product_id: 1,
          variant_id: 1,
          sizeVariantId: 1,
        }
      }
    ])

    // console.log(orderItems)

    return res.status(200).send({ success: true, message: "Orders found", orderItems });
  } catch (error) {
    console.log("Error while getting all orders fro seller", error);
    return res.status(500).send({ success: false, message: "Internal server error" });
  }
}

// To generate AWB with shiprocket
module.exports.generateAwb = async (req, res) => {
  try {
    const { orderItemId } = req.body;

    // Getting shipment id from shiprocketDetail collection using orderItemId
    const shiprocketDetail = await ShiprocketDetail.findOne({
      order_item_id: orderItemId
    })
    // If no data found then send BAD request response
    if (!shiprocketDetail) {
      return res.state(400).send({ success: false, message: "Bad request" })
    }

    // Getting auth token form shiprocket
    const authRespose = await axios.post(`${process.env.SHIPROCKET_BASE_URL}/auth/login`, {
      email: process.env.SHIPROCKET_EMAIL,
      password: process.env.SHIPROCKET_PASSWORD,
    })

    // Create awb number using shiprocket api using shipment_id and courier_id
    const awbGenerationResponse = await axios.post(`${process.env.SHIPROCKET_BASE_URL}/courier/assign/awb`,
      {
        shipment_id: shiprocketDetail.shipment_id,
        courier_id: shiprocketDetail.courier_id,
      },
      {
        headers: {
          'Authorization': `Bearer ${authRespose.data.token}`, // Replace with your access token
          'Content-Type': 'application/json'
        }
      }
    )

    console.log(awbGenerationResponse.data)
    // After awb gerneration saved detai to ShiprocketDetail, (is_awb_generated, awb_generated_at, is_order_processeing) from orderItem

    // Return success response after generating AWB number
    return res.status(200).send({ success: true, message: "AWB generated" });
  } catch (error) {
    // While any error occures
    console.log("Error while getting all orders fro seller", error);
    console.log(error?.response?.data)
    return res.status(500).send({ success: false, message: "Internal server error" });
  }
}

module.exports.getSellerInfo = async (req, res) => {
  try {
    // const sellerData = await sellerModel.findOne({ _id: req.seller._id });
    const sellerData = await sellerModel.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(req.seller._id)
        }
      },
      {
        $lookup: {
          from: 'sellerpickuplocations',
          localField: '_id',
          foreignField: 'seller_id',
          as: 'sellerPickupLocation'
        }
      },
      // {
      //   $unwind: "$sellerPickupLocation"
      // }
    ])
    return res.status(200).send({ success: true, message: "Sellor information found", sellerData: sellerData[0] });
  } catch (error) {
    console.log("Error while getting seller info", error);
    return res.status(500).send({ success: false, message: "Internal server error" });
  }
}

module.exports.applyForApproval = async (req, res) => {
  try {
    const sellerData = await sellerModel.findOne({ _id: req.seller._id });

    if (!sellerData.isPickUpLocationAdded) {
      return res.status(400).send({ success: false, message: "Please add pickup location" });
    }

    sellerData.isAppliedForApproval = true;
    await sellerData.save();

    return res.status(200).send({ success: true, message: "Sellor information found" });
  } catch (error) {
    console.log("Error while getting seller info", error);
    return res.status(500).send({ success: false, message: "Internal server error" });
  }
}