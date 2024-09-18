import React, { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import OTP from "./OTP";

const SignUp = () => {
  const initialValues = {
    name: "",
    mobile: "",
    email: "",
  };

  const signUpSchema = Yup.object({
    name: Yup.string().min(3).required("Please enter your username"),
    mobile: Yup.string()
      .matches(/^\d{10}$/, "Mobile number must be 10 digits")
      .required("A phone number is required"),
    email: Yup.string().email().required("Please enter your email"),
  });

  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: signUpSchema,
      onSubmit: async (values) => {
        try {
          const response = await fetch(
            `${
              import.meta.env.VITE_BACKEND_URL
            }/app/user/sendOtpForRegistration`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                user_name: values.name,
                email: values.email,
                mobile_number: values.mobile,
              }),
            }
          );

          if (response.ok) {
            const responseData = await response.json();

            if (responseData.responseCode === 409) {
              // Set error message for existing user
              setErrorMessage(responseData.responseMessage);
            } else {
              // Clear error message
              setErrorMessage("");

              // Redirect to OTP page if OTP is successfully sent
              navigate("/otp", { state: { userData: values } });
            }
          } else {
            // Handle the case where OTP sending failed
            console.error("Failed to send OTP");
          }
        } catch (error) {
          console.error("Error sending OTP:", error);
        }
      },
    });

  const handleCancel = () => {
    // Redirect to the home page
    navigate("/");
  };

  return (
    <div className="flex flex-col">
      <section className="bg-gray-50 h-screen flex-1">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto">
          <div className="w-full bg-white rounded-lg shadow sm:max-w-md">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Create your Account
              </h1>

              <form
                className="space-y-4 md:space-y-6"
                action="#"
                onSubmit={handleSubmit}
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
                  <div className="flex items-center w-full">
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
                      className="bg-gray-50 border text-gray-900 sm:text-sm rounded-md focus:ring-2 focus:outline-none focus:ring-slate-600 p-2.5 ml-2 flex flex-1"
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
                    placeholder="name@company.com "
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

                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      aria-describedby="terms"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 accent-red-500"
                      required
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="terms" className="font-light text-gray-500">
                      I accept the{" "}
                      <a
                        className="font-medium text-red-600 hover:underline"
                        href="#"
                      >
                        Terms and Conditions
                      </a>
                    </label>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button
                    type="submit"
                    className="w-full text-slate-200 bg-red-500 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-md text-sm px-5 py-2.5 text-center mt-4"
                  >
                    Create an Account
                  </button>

                  {/* Cancel Button */}
                  <button
                    type="button"
                    onClick={() => navigate("/login")}
                    className="w-full text-gray-600 border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-md text-sm px-5 py-2.5 text-center mt-4"
                  >
                    Cancel
                  </button>
                </div>

                {errorMessage && (
                  <p className="text-red-600 text-[0.75rem] mt-2">
                    {errorMessage}
                  </p>
                )}
              </form>

              <div className="mt-6 grid grid-cols-3 gap-3">
                <div>
                  <a
                    href="#"
                    className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <FaFacebook fill="blue" size={"1.5rem"} />
                  </a>
                </div>
                <div>
                  <a
                    href="#"
                    className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <FaXTwitter size={"1.5rem"} />
                  </a>
                </div>
                <div>
                  <a
                    href="#"
                    className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <FcGoogle size={"1.5rem"} />
                  </a>
                </div>
              </div>

              <p className="text-sm text-gray-500 font-medium">
                Already have an account?{" "}
                <Link to="/login" className="text-red-600 hover:underline">
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

export default SignUp;
