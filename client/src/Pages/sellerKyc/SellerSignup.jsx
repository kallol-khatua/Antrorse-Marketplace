import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const SellerSignUp = () => {
  const [otp, setOtp] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isKycPopupVisible, setIsKycPopupVisible] = useState(false);
  const [otpType, setOtpType] = useState("mobile");
  const [resendTimer, setResendTimer] = useState(30);
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { userData } = location.state || {};

  // Define initial form values
  const initialValues = {
    name: "",
    email: "",
    countryCode: "+91",
    mobile: "",
    gstNumber: "",
  };

  // Define form validation schema
  const signUpSchema = Yup.object({
    name: Yup.string().min(3).required("Please enter your username"),
    email: Yup.string().email().required("Please enter your email"),
    countryCode: Yup.string().required("Please select a country code"),
    mobile: Yup.string()
      .matches(/^\d{10}$/, "Mobile number must be 10 digits")
      .required("A phone number is required"),
    gstNumber: Yup.string().required("Please enter your company GST number"),
  });

  const headers = {
    "Content-Type": "application/json",
  };
  // Initialize formik for form handling
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: signUpSchema,
      onSubmit: async () => {
        try {
          const response = await axios.post(
            `${
              import.meta.env.VITE_BACKEND_URL
            }/app/seller/sendOtpForRegistration`,
            {
              fullName: values.name,
              email_id: values.email,
              mobile_number: values.mobile,
              GST: values.gstNumber,
            },
            { headers }
          );

          const generatedOtp = response.data.otp;

          setIsSubmitted(true);
          setOtp(generatedOtp);
        } catch (error) {
          console.error("Error sending data to generate OTP:", error);
        }
      },
    });

  const showKycPopup = () => {
    setIsKycPopupVisible(true);
  };

  const handleVerify = async () => {
    try {
      const verificationResponse = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/app/seller/sellerRegistration`,
        {
          mobile_number: values.mobile,
          fullName: values.name,
          email_id: values.email,
          GST: values.gstNumber,
        },
        { headers }
      );

      if (verificationResponse.data.success) {
        setIsSubmitted(false);
        showKycPopup();
      } else {
        alert("Your account has been created successfully..");
        // navigate("/sellercreatepassword", { state: { userData, mobile: values.mobile } });
        // navigate("/sellercreatepassword", { state: { userData, mobile: values.mobile } });
        navigate("/sellercreatepassword", {
          state: { userData, mobile: values.mobile },
        });
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
    }
  };

  const handleResendOtp = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/app/seller/resendOtp`,
        {
          otpType: "mobile",
          mobile: values.mobile,
          email: values.email,
        },
        { headers }
      );

      setIsResendDisabled(true);
      setResendTimer(30);
    } catch (error) {
      console.error("Error resending OTP:", error);
    }
  };

  useEffect(() => {
    let timer;

    if (isResendDisabled) {
      timer = setInterval(() => {
        setResendTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [isResendDisabled]);

  useEffect(() => {
    if (resendTimer === 0) {
      setIsResendDisabled(false);
    }
  }, [resendTimer]);

  return (
    <div className="flex flex-col">
      <section className="bg-gray-50 h-screen flex-1">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto">
          <div className="w-full bg-white rounded-lg shadow sm:max-w-md">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Register as a Seller
              </h1>

              {isSubmitted ? (
                <form className="space-y-2 md:space-y-4">
                  <div className="flex flex-col gap-1">
                    <label
                      htmlFor="otp"
                      className="text-sm font-medium text-gray-900"
                    >
                      Enter OTP sent to your{" "}
                      {otpType === "mobile" ? "mobile" : "email"}
                    </label>
                    <input
                      type="text"
                      id="otp"
                      className="bg-gray-50 border text-gray-900 sm:text-sm rounded-md focus:ring-2 focus:outline-none focus:ring-slate-600 block w-full p-2.5"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                    />
                  </div>

                  <div className="">
                    <button
                      type="button"
                      className="text-sm text-blue-500 cursor-pointer hover:underline "
                      onClick={() =>
                        setOtpType(otpType === "mobile" ? "email" : "mobile")
                      }
                    >
                      Send OTP to {otpType === "mobile" ? "Email" : "Mobile"}
                    </button>

                    <div className=" mt-4 md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-2">
                      <button
                        type="button"
                        onClick={handleVerify}
                        className="w-full  text-slate-200 bg-red-500 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-md text-sm px-5 py-2.5 text-center mt-4 md:mt-0 "
                      >
                        Verify OTP
                      </button>
                      <button
                        type="button"
                        onClick={handleResendOtp}
                        disabled={isResendDisabled}
                        className={`w-full py-2.5 px-5 text-sm mt-24 ${
                          isResendDisabled ? "text-gray-500" : "text-blue-500"
                        } cursor-pointer hover:underline`}
                      >
                        {isResendDisabled
                          ? `Resend OTP in ${resendTimer}s`
                          : "Resend OTP"}
                      </button>
                    </div>
                  </div>
                </form>
              ) : (
                <form
                  className="space-y-4 md:space-y-6"
                  action="#"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                  }}
                >
                  <div className="flex flex-col gap-1">
                    <label
                      htmlFor="text"
                      className="text-sm font-medium text-gray-900"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="text"
                      className="bg-gray-50 border text-gray-900 sm:text-sm rounded-md focus:ring-2 focus:outline-none focus:ring-slate-600 block w-full p-2.5"
                      placeholder="John Doe"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.name && touched.name ? (
                      <p className="text-red-600 text-[0.75rem] capitalize">
                        {errors.name}
                      </p>
                    ) : null}
                  </div>

                  <div className="flex flex-col gap-1">
                    <label
                      htmlFor="mobile"
                      className="text-sm font-medium text-gray-900"
                    >
                      Mobile Number
                    </label>
                    <div className="flex items-center">
                      <select
                        name="countryCode"
                        id="countryCode"
                        className="bg-gray-50 border text-gray-900 sm:text-sm rounded-md focus:ring-2 focus:outline-none focus:ring-slate-600 p-2.5"
                        value={values.countryCode}
                        onChange={handleChange}
                      >
                        <option value="+91">+91</option>
                        {/* Add more country codes as needed */}
                      </select>
                      <input
                        type="text"
                        name="mobile"
                        id="mobile"
                        className="bg-gray-50 border w-full text-gray-900 sm:text-sm rounded-md focus:ring-2 focus:outline-none focus:ring-slate-600 p-2.5 ml-2"
                        placeholder="1234567890"
                        value={values.mobile}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                    {errors.mobile && touched.mobile ? (
                      <p className="text-red-600 text-[0.75rem] capitalize">
                        {errors.mobile}
                      </p>
                    ) : null}
                  </div>

                  <div className="flex flex-col gap-1">
                    <label
                      htmlFor="email"
                      className="text-sm font-medium text-gray-900"
                    >
                      Email ID
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="bg-gray-50 border text-gray-900 sm:text-sm rounded-md focus:ring-2 focus:outline-none focus:ring-slate-600 block w-full p-2.5"
                      placeholder="name@company.com"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.email && touched.email ? (
                      <p className="text-red-600 text-[0.75rem] capitalize">
                        {errors.email}
                      </p>
                    ) : null}
                  </div>

                  <div className="flex flex-col gap-1">
                    <label
                      htmlFor="gstNumber"
                      className="text-sm font-medium text-gray-900"
                    >
                      GSTIN (Goods and Services Tax Identification Number)
                    </label>
                    <input
                      type="text"
                      name="gstNumber"
                      id="gstNumber"
                      className="bg-gray-50 border text-gray-900 sm:text-sm rounded-md focus:ring-2 focus:outline-none focus:ring-slate-600 block w-full p-2.5"
                      placeholder="Enter your company GST number"
                      value={values.gstNumber}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.gstNumber && touched.gstNumber ? (
                      <p className="text-red-600 text-[0.75rem] capitalize">
                        {errors.gstNumber}
                      </p>
                    ) : null}
                  </div>

                  <div className="flex space-x-2">
                    <button
                      type="submit"
                      className="w-full text-slate-200 bg-red-500 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-md text-sm px-5 py-2.5 text-center mt-4"
                    >
                      Submit
                    </button>

                    {/* Cancel Button */}
                    <button
                      type="button"
                      onClick={() => navigate("/sellerlogin")}
                      className="w-full text-gray-600 border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-md text-sm px-5 py-2.5 text-center mt-4"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              {/* {isSubmitted && (
                <div className={`popup ${isKycPopupVisible ? "visible" : ""}`}>
                  <div className="popup-content">
                    <p className="py-2 px-2">
                      Verification successfully! You can now proceed. However,
                      KYC is pending. Please complete your KYC before
                      proceeding.
                    </p>
                    <Link
                      to="/kycform"
                      className={`bg-blue-500 text-white py-2 px-4 rounded mt-4 ${
                        window.location.pathname === "/kycform"
                          ? "bg-blue-700"
                          : ""
                      }`}
                      onClick={closeKycPopup}
                    >
                      Go to KYC Page
                    </Link>
                  </div>
                </div>
              )} */}

              <p className="text-sm text-gray-500 font-medium">
                Already have an account?{" "}
                <Link
                  to="/sellerlogin"
                  className="text-red-600 hover:underline"
                >
                  Login here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SellerSignUp;
