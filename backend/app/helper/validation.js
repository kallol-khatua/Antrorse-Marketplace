module.exports={
     isValidEmail : (email) => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return emailRegex.test(email);
      },
       isEmpty : (value) => {
        // Check if the value is null or undefined
        if (value === null || value === undefined) {
          return true;
        }
    },
     isNonEmptyString :(value) => {
        return typeof value === 'string' && value.trim().length > 0;
      },
      isValidMobileNumber :(number) => {
        // Check if the value is a non-empty string
        if (typeof number !== 'string' || number.trim().length === 0) {
          return false;
        }
      
        // Check if the value is a 10-digit numeric string
        const numericRegex = /^\d{10}$/;
        return numericRegex.test(number);
      },
      gstValidation:function(number){
        const gstinRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;

        return gstinRegex.test(number)
      },
      isValidPAN:function(panNumber) {
        // Define the PAN number regex pattern
        const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
    
        // Test if the provided PAN number matches the regex pattern
        return panRegex.test(panNumber);
    },
    isValidTAN :(tan) => /^[A-Z]{4}\d{5}[A-Z]$/.test(tan),
  isValidAadharNumber :(aadhar) => /^\d{12}$/.test(aadhar)
    
}