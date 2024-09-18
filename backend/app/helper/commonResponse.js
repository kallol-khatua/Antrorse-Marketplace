module.exports = {

    commonResponse: (res, statusCode, result, message) => {
        return res.json({
            responseCode: statusCode,
            responseMessage: message || "",
            result: result || ""
        })
    }
   ,
   commonErrorResponse: (res, statusCode,result,message)=>{
    return res.json({
        responseCode: statusCode,
        responseMessage: message || "",
        result: result || ""
    })
   }
   
   

}