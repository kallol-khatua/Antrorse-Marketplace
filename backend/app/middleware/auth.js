require("dotenv").config()
const userModel = require("../models/user/userModel");
const sellerModels= require("../models/seller/sellerModels")
const jwt = require("jsonwebtoken");
const response = require("../helper/commonResponse");
const { ErrorCode } = require("../helper/statusCode");
const { ErrorMessage } = require("../helper/message");
const { default: mongoose } = require("mongoose");

module.exports = {
  authorization: (req, res, next) => {
    try {
    let token=req.headers.token
    if(!token){
    return   response.commonErrorResponse(
        res,
        ErrorCode.NOT_FOUND,
        {},
        ErrorMessage.NO_TOKEN
      );
    }
    
      jwt.verify(
        token
        ,
        process.env.SECRET_KEY,
        (error, result) => {
          
          if (error) {
            return response.commonErrorResponse(
              res,
              ErrorCode.BAD_REQUEST,
              error.message,
              ErrorMessage.INVALID_TOKEN
            );
          } else {
            userModel.findOne({ _id:mongoose.Types.ObjectId(result.user_id) }, (userErr, userResult) => {
              if (userErr) {
                return response.commonErrorResponse(
                  res,
                  ErrorCode.INTERNAL_ERROR,
                  userErr,
                  ErrorMessage.INTERNAL_ERROR
                );
              } else if (!userResult) {
                return response.commonErrorResponse(
                  res,
                  ErrorCode.NOT_FOUND,
                  {},
                  ErrorMessage.NOT_FOUND
                );
              } else {
                req.user_id = userResult._id;
                
                next();
              }
            });
          }
        }
      );
    } catch (error) {
      console.log(error);
      return response.commonErrorResponse(
        res,
        ErrorCode.INTERNAL_ERROR,
        {},
        err.ErrorMessage
      );
    }
  },
  sellerAuth: (req, res, next) => {
    try {
      let token=req.headers.token
      if(!token){
      return   response.commonErrorResponse(
          res,
          ErrorCode.NOT_FOUND,
          {},
          ErrorMessage.NO_TOKEN
        );
      }

      jwt.verify(
        token,
        process.env.SECRET_KEY,
        (error, result) => {
         
          if (error) {
           
            return response.commonErrorResponse(
              res,
              ErrorCode.BAD_REQUEST,
              error.message,
              ErrorMessage.INVALID_TOKEN
            );
          } else {
            sellerModels.findOne({ _id:mongoose.Types.ObjectId(result.seller_id) }, (sellErr, sellerResult) => {
              if (sellErr) {
                return response.commonErrorResponse(
                  res,
                  ErrorCode.INTERNAL_ERROR,
                  sellErr,
                  ErrorMessage.INTERNAL_ERROR
                );
              } else if (!sellerResult) {
                return response.commonErrorResponse(
                  res,
                  ErrorCode.NOT_FOUND,
                  {},
                  ErrorMessage.NOT_FOUND
                );
              } else {
                req.seller_id = sellerResult._id;
                
                next();
              }
            });
          }
        }
      );
    } catch (error) {
      console.log(error);
      return response.commonErrorResponse(
        res,
        ErrorCode.INTERNAL_ERROR,
        {},
        err.ErrorMessage
      );
    }
  },
};
