require("dotenv").config();
const userModel = require("../models/user/userModel");
const userAddressModel = require("../models/user/userAddressModel");
const jwt = require("jsonwebtoken");
const response = require("../helper/commonResponse");
const { SuccessMessage, ErrorMessage } = require("../helper/message");
const { ErrorCode, SuccessCode } = require("../helper/statusCode");
const commonFunction = require("../helper/commonFunction");
const validation = require("../helper/validation");
const bcrypt = require("bcrypt");
const Address = require("../models/user/userAddressModel");
const OrderItem = require("../models/orders/orderItem");
const Order = require("../models/orders/orderModels");
const { default: mongoose } = require("mongoose");

module.exports.register = async (req, res) => {
  try {
    const data = req.body;
    // console.log(data)

    if (!data.isAcceptTermsAndConditions) {
      return res.status(400).send({ success: false, message: "Please accept terms and conditions" })
    }

    if (!validation.isNonEmptyString(data.name)) {
      return res.status(400).send({ success: false, message: ErrorMessage.NAME_EMPTY })
    }

    if (
      !data.mobile_number ||
      !validation.isValidMobileNumber(data.mobile_number)
    ) {
      return res.status(400).send({ success: false, message: ErrorMessage.PHONE_EMPTY })
    }

    if (data.email && !validation.isValidEmail(data.email)) {
      return res.status(400).send({ success: false, message: ErrorMessage.INVALID_EMAIL })
    }

    if (data.email) {
      let checkEmailUnique = await userModel.findOne({ email: data.email });
      if (checkEmailUnique) {
        return res.status(400).send({ success: false, message: ErrorMessage.ALREADY_EXIST_EMAIL })
      }
    }

    let checkedMobileNumberUnique = await userModel.findOne({
      mobile_number: data.mobile_number,
    });

    if (checkedMobileNumberUnique) {
      return res.status(400).send({ success: false, message: ErrorMessage.MOBILE_EXIST })
    }

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashedPassword = await bcrypt.hash(data.password, salt);

    let newUser = new userModel({
      name: data.name,
      email: data.email,
      mobile_number: Number(data.mobile_number),
      password: hashedPassword,
      isAcceptTermsAndConditions: Boolean(data.isAcceptTermsAndConditions)
    })

    let registerUser = await newUser.save();
    let authToken = registerUser.generateAuthToken();
    // console.log(authToken)
    if (registerUser) {
      return res.status(201).send({ success: true, message: "Account created successfully", registerUser, authToken });
    }
  } catch (err) {
    console.log("Error while creating new user account", err);
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
    let checkNumber = await userModel.findOne({
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
    // console.log(otp);
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

module.exports.login = async function (req, res) {
  try {
    let data = req.body;
    if (!data.password) {
      return res.status(400).send({ success: false, message: "Password is required" })
    }
    if (!data.mobile_number) {
      return res.status(400).send({ success: false, message: "Mobile number is required" })
    }
    if (
      !validation.isValidMobileNumber(data.mobile_number)
    ) {
      return res.status(400).send({ success: false, message: ErrorMessage.PHONE_EMPTY })
    }
    let userData = await userModel.findOne({
      mobile_number: data.mobile_number,
    });
    if (!userData) {
      return res.status(400).send({ success: false, message: "Invalid mobile number" })
    }
    const matchPass = await bcrypt.compare(data.password, userData.password);
    if (!matchPass) {
      return res.status(400).send({ message: 'Invalid password.' });
    }

    let authToken = userData.generateAuthToken();

    if (authToken) {
      return res.status(200).send({ success: true, message: "Login successfully", authToken });
    }
  } catch (err) {
    console.log("Error while login user", err);
    return res.status(500).send({ success: false, message: "Internal server error" });
  }
}

module.exports.loginWithOTP = async function (req, res) {
  try {
    let data = req.body;
    let userData;

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
    if (data.mobile_number) {
      userData = await userModel.findOne({
        mobile_number: data.mobile_number,
      });
    } else {
      return response.commonErrorResponse(
        res,
        ErrorCode.BAD_REQUEST,
        {},
        ErrorMessage.NOT_FOUND
      );
    }

    if (!userData) {
      return response.commonErrorResponse(
        res,
        ErrorCode.NOT_FOUND,
        {},
        ErrorMessage.USER_NOT_FOUND
      );
    }

    let payLoad = {
      user_id: userData._id.toString(),
    };
    let token = jwt.sign(payLoad, process.env.SECRET_KEY, {
      expiresIn: "72h",
    });
    if (token) {
      return response.commonResponse(
        res,
        SuccessCode.SUCCESS,
        token,
        SuccessMessage.LOGIN_SUCCESS
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
    let user_id = req.user_id;
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
    if (files?.length > 0) {
      updateData.user_image = files[0].originalname;
    }
    if (data.DOB) {
      updateData.DOB = data.DOB;
    }
    if (data.Security_questions) {
      updateData.Security_questions = data.Security_questions;
    }
    if (data.Secret_answers) {
      updateData.Secret_answers = data.Secret_answers;
    }

    let updated = await userModel.findOneAndUpdate(
      { _id: req.user_id },

      { $set: updateData },
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

    let userData = await userModel.findOne({ mobile_number: mobile_number });
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
    let updatePassword = await userModel.findOneAndUpdate(
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

module.exports.getUser = async function (req, res) {
  try {
    let user_id = req.user_id;

    let getData = await userModel.findById(user_id);
    if (!getData) {
      getData = await userModel.findById(user_id);
      if (!getData) {
        return response.commonErrorResponse(
          res,
          ErrorCode.NOT_FOUND,
          {},
          ErrorMessage.NOT_FOUND
        );
      }
    }
    return response.commonResponse(
      res,
      SuccessCode.SUCCESS,
      getData,
      SuccessMessage.DATA_FOUND
    );
  } catch (err) {
    return response.commonErrorResponse(
      res,
      ErrorCode.INTERNAL_ERROR,
      {},
      err.message
    );
  }
}

module.exports.userDeleteProfile = async function (req, res) {
  try {
    let user_id = req.user_id;

    // Check if the user with the given ID exists
    const existingUser = await userModel.findById(user_id);

    if (!existingUser) {
      return response.commonErrorResponse(
        res,
        ErrorCode.NOT_FOUND,
        {},
        ErrorMessage.USER_NOT_FOUND
      );
    }

    // User exists, proceed with deletion
    let deletedUser = await userModel.findByIdAndDelete({ user_id });

    if (deletedUser) {
      return response.commonResponse(
        res,
        SuccessCode.SUCCESS,
        deletedUser,
        SuccessMessage.DELETE_SUCCESS
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

// ============= userDress=================
module.exports.createAddress = async function (req, res) {
  try {
    let data = req.body;
    data.user_id = req.user._id;

    const newAddress = new Address(data);
    const savedAddress = await newAddress.save();

    return res.status(201).send({ success: true, message: "Address added successfully", savedAddress });
  } catch (err) {
    console.log("Error while creating new user address", err);
    return res.status(500).send({ success: false, message: "Internal server error" });
  }
}
//================getUserAdress======================

module.exports.getAddress = async function (req, res) {
  try {
    let addresses = await Address.find({ user_id: req.user._id });
    addresses = addresses.reverse()

    return res.status(200).send({ success: true, message: "Addresses found successfully", addresses });
  } catch (err) {
    console.log("Error while getting user addresses", err);
    return res.status(500).send({ success: false, message: "Internal server error" });
  }
}

module.exports.getAllorders = async (req, res) => {
  try {
    const orderItems = await Order.aggregate([
      {
        $match: {
          user_id: new mongoose.Types.ObjectId(req.user._id),
        }
      },
      {
        $lookup: {
          from: 'orderitems', // The collection name for OrderItem
          localField: '_id', // Field in Order
          foreignField: 'order_id', // Field in OrderItem that references Order
          as: 'orderItems', // Result array field name
        },
      },
      {
        $unwind: '$orderItems', // Flatten the orderDetails array
      },
      {
        $lookup: {
          from: 'products', // The collection name for Product
          localField: 'orderItems.product_id', // Field in OrderItem
          foreignField: '_id', // Field in Product
          as: 'orderItems.productDetails', // Result array field name for product details
        },
      },
      {
        $unwind: '$orderItems.productDetails', // Flatten the orderDetails array
      },
      {
        $project: {
          _id: 1,
          is_order_placed: 1,
          orderPlacedAt: 1,
          // userId: 1,
          // orderDate: 1,
          // status: 1,
          orderItems: 1, // Include the orderItems array
          // Add any other fields you need from the Order model
        },
      },
    ])

    // console.log(orderItems);
    // console.log(orderItems[0].orderItems);

    return res.status(200).send({ success: true, message: "Orders found successfully", orderItems });
  } catch (error) {
    console.log("error while loading user all orders", error);
    return res.status(500).send({ success: false, message: "Internal server error" });
  }
}