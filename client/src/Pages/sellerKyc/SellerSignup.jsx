import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setSellerAuth } from "../../redux/features/Seller/SellerSclice";
import { toast } from "react-toastify";

const SellerSignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Define initial form values
  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobile_number: "",
    isAcceptTermsAndConditions: true,
    // gst_number: "",
    company_name: "",
  };

  // Define form validation schema
  const signUpSchema = Yup.object({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .required("Please enter your name"),
    email: Yup.string().email().required("Please enter your email address"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Please enter password"),
    confirmPassword: Yup.string()
      .min(8, "confirm password must be at least 8 characters")
      .required("Please enter confirm password"),
    mobile_number: Yup.string()
      .matches(/^\d{10}$/, "Mobile number must be 10 digits")
      .required("A phone number is required"),
    isAcceptTermsAndConditions: Yup.boolean().required(
      "Please accept Terms and Conditions"
    ),
    // gst_number: Yup.string()
    //   .min(15, "GST number must be at least 15 characters")
    //   .max(15, "GST number must be at most 15 characters")
    //   .required("Please enter your company GST number"),
    company_name: Yup.string()
      .min(3, "Company name must be at least 3 characters")
      .required("Please enter your company name"),
  });

  // Initialize formik for form handling
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: signUpSchema,
      onSubmit: async () => {
        // console.log(values);
        try {
          const url = `${
            import.meta.env.VITE_BACKEND_URL
          }/seller/sellerRegistration`;
          const response = await axios.post(url, values);

          if (response.status === 201) {
            toast.success("Seller application submitted");
            navigate("/");
          }
        } catch (error) {
          console.error("Error while creating new seller account");
        }
      },
    });

  return (
    <div className="flex flex-col">
      <section className="bg-gray-50 h-screen flex-1">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto">
          <div className="w-full bg-white rounded-lg shadow sm:max-w-md">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Register as a Seller
              </h1>
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
                    Name (Required)
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
                    htmlFor="mobile_number"
                    className="text-sm font-medium text-gray-900"
                  >
                    Mobile Number (Required)
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
                      name="mobile_number"
                      id="mobile_number"
                      className="bg-gray-50 border text-gray-900 sm:text-sm rounded-md focus:ring-2 focus:outline-none focus:ring-slate-600 p-2.5 ml-2 flex flex-1"
                      placeholder="1234567890"
                      value={values.mobile_number}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                  {errors.mobile_number && touched.mobile_number ? (
                    <p className="text-red-600 text-[0.75rem] capitalize">
                      {errors.mobile_number}
                    </p>
                  ) : null}
                </div>

                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-900"
                  >
                    Email ID (Required)
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
                  {errors.email && touched.email && (
                    <p className="text-red-600 text-[0.75rem] capitalize">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="password"
                    className=" text-sm font-medium text-gray-900 "
                  >
                    Password (Required)
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-md focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  "
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.password && touched.password && (
                    <p className="text-red-600 text-[0.75rem] capitalize">
                      {errors.password}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="confirmPassword"
                    className=" text-sm font-medium text-gray-900 "
                  >
                    Confirm password (Required)
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-md focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  "
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.confirmPassword && touched.confirmPassword && (
                    <p className="text-red-600 text-[0.75rem] capitalize">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="company_name"
                    className="text-sm font-medium text-gray-900"
                  >
                    Company name (Required)
                  </label>
                  <input
                    type="text"
                    name="company_name"
                    id="company_name"
                    className="bg-gray-50 border text-gray-900 sm:text-sm rounded-md focus:ring-2 focus:outline-none focus:ring-slate-600 block w-full p-2.5"
                    placeholder="Enter your company name"
                    value={values.company_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.company_name && touched.company_name && (
                    <p className="text-red-600 text-[0.75rem] capitalize">
                      {errors.company_name}
                    </p>
                  )}
                </div>

                {/* <div className="flex flex-col gap-1">
                  <label
                    htmlFor="gst_number"
                    className="text-sm font-medium text-gray-900"
                  >
                    GSTIN (Required)
                  </label>
                  <input
                    type="text"
                    name="gst_number"
                    id="gst_number"
                    className="bg-gray-50 border text-gray-900 sm:text-sm rounded-md focus:ring-2 focus:outline-none focus:ring-slate-600 block w-full p-2.5"
                    placeholder="Enter your company GST number"
                    value={values.gst_number}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.gst_number && touched.gst_number && (
                    <p className="text-red-600 text-[0.75rem] capitalize">
                      {errors.gst_number}
                    </p>
                  )}
                </div> */}

                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="isAcceptTermsAndConditions"
                      aria-describedby="isAcceptTermsAndConditions"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 accent-red-500"
                      value={values.isAcceptTermsAndConditions}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="isAcceptTermsAndConditions"
                      className="font-light text-gray-500"
                    >
                      I accept the{" "}
                      <Link
                        className="font-medium text-red-600 hover:underline"
                        to="/terms-and-conditions"
                      >
                        Terms and Conditions
                      </Link>
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
                    onClick={() => navigate("/sellerlogin")}
                    className="w-full text-gray-600 border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-md text-sm px-5 py-2.5 text-center mt-4"
                  >
                    Cancel
                  </button>
                </div>
              </form>

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
