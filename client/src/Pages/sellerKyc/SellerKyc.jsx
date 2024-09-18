import { useState } from "react";

function KYCForm() {
  const [isKYCComplete, setIsKYCComplete] = useState(false);
  const [errors, setErrors] = useState({});

  const handleKYCSubmit = () => {
    // Perform KYC submission logic here
    // For demonstration purposes, setting a timeout to simulate a submission process
    setTimeout(() => {
      const hasErrors = validateForm();
      if (!hasErrors) {
        setIsKYCComplete(true);
      }
    }, 2000);
  };

  const validateForm = () => {
    const errors = {};
    // Example validation for Aadhaar number (12 digits)
    const aadhaarRegex = /^\d{12}$/;

    // Validate Aadhaar number
    if (!aadhaarRegex.test(document.getElementById("aadhaarNumber").value)) {
      errors.aadhaarNumber = "Invalid Aadhaar number";
    }

    setErrors(errors);
    return Object.keys(errors).length > 0;
  };

  return (
    <div className="w-full px-4 sm:px-0 max-w-md mx-auto overflow-hidden rounded-lg shadow-md bg-white">
      <div className="bg-blue-800 py-4 text-white text-center">
        <p className="text-2xl font-semibold tracking-wider">KYC Form</p>
        <p>Please fill out the KYC details below.</p>
      </div>

      <div className="px-6 py-8 space-y-4">
        <div>
          <label
            className="block text-sm font-medium text-gray-600"
            htmlFor="fullName"
          >
            Full Name
          </label>
          <input
            className={`w-full px-3 py-2 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-600 ${
              errors.fullName ? "border-red-500" : ""
            }`}
            id="fullName"
            type="text"
            placeholder="Full Name"
          />
          {errors.fullName && (
            <p className="text-red-600 text-sm">{errors.fullName}</p>
          )}
        </div>
        <div>
          <label
            className="block text-sm font-medium text-gray-600"
            htmlFor="mobileNumber"
          >
            Mobile Number
          </label>
          <input
            className={`w-full px-3 py-2 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-600 ${
              errors.mobileNumber ? "border-red-500" : ""
            }`}
            id="mobileNumber"
            type="text"
            placeholder="Mobile Number"
          />
          {errors.mobileNumber && (
            <p className="text-red-600 text-sm">{errors.mobileNumber}</p>
          )}
        </div>
        <div>
          <label
            className="block text-sm font-medium text-gray-600"
            htmlFor="emailId"
          >
            Email ID
          </label>
          <input
            className={`w-full px-3 py-2 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-600 ${
              errors.emailId ? "border-red-500" : ""
            }`}
            id="emailId"
            type="text"
            placeholder="Email ID"
          />
          {errors.emailId && (
            <p className="text-red-600 text-sm">{errors.emailId}</p>
          )}
        </div>
        <div>
          <label
            className="block text-sm font-medium text-gray-600"
            htmlFor="aadhaarNumber"
          >
            Aadhaar Number
          </label>
          <input
            className={`w-full px-3 py-2 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-600 ${
              errors.aadhaarNumber ? "border-red-500" : ""
            }`}
            id="aadhaarNumber"
            type="text"
            placeholder="Aadhaar Number"
          />
          {errors.aadhaarNumber && (
            <p className="text-red-600 text-sm">{errors.aadhaarNumber}</p>
          )}
        </div>
        <div>
          <label
            className="block text-sm font-medium text-gray-600"
            htmlFor="documentUpload"
          >
            Upload Documents
          </label>
          <input
            className="w-full px-3 py-2 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-600"
            id="documentUpload"
            type="file"
          />
        </div>
        <button
          className="w-full bg-blue-800 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
          type="button"
          onClick={handleKYCSubmit}
        >
          Submit
        </button>
      </div>

      {isKYCComplete && (
        <div className="bg-green-100 border-l-4 border-green-500 p-4 mt-4">
          <p className="text-green-700">
            KYC done successfully! You can now proceed.
          </p>
        </div>
      )}
    </div>
  );
}

export default KYCForm;
