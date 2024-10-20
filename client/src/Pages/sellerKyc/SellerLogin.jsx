import React, { useEffect, useState } from "react";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { auth } from "../../redux/features/User/UserSlice";
import axios from "axios";
import { setSellerAuth } from "../../redux/features/Seller/SellerSclice";

const SellerLogin = () => {
  // const credentials = {
  //   username: "admin123@gmail.com",
  //   password: "123456",
  // };

  const initialValues = {
    mobile_number: "",
    password: "",
  };

  const loginSchema = Yup.object({
    mobile_number: Yup.string()
      .matches(/^\d{10}$/, "Mobile number must be 10 digits")
      .required("A phone number is required"),
    password: Yup.string().min(8).required("Please enter your password"),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: loginSchema,

      onSubmit: async () => {
        try {
          const url = `${import.meta.env.VITE_BACKEND_URL}/seller/sellerLogin`;
          const response = await axios.post(url, values);
          // console.log(response);
          if (response.status === 200) {
            toast.success(response.data.message);
            dispatch(setSellerAuth(true));
            localStorage.setItem("isAuthorizedSeller", JSON.stringify(true));
            localStorage.setItem(
              "sellerAuthToken",
              // JSON.stringify(response.data.authToken)
              response.data.authToken
            );
            navigate("/seller/dashboard", { replace: true });
            // window.location.reload();
          }
        } catch (error) {
          if (error.response.status === 400) {
            toast.error(error?.response?.data?.message);
          }
          console.error("Error while login");
        }
      },
    });

  const handleCancel = () => {
    navigate(-1);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const isSellerLoggedIn = useSelector((state) => state.seller.authorized);
  useEffect(() => {
    if (isSellerLoggedIn) {
      navigate("/seller/dashboard");
    }
  }, [isSellerLoggedIn, navigate]);

  return (
    <div className="bg-gray-50   flex-1  ">
      <div className="flex flex-col items-center justify-center  px-6 py-8 mx-auto ">
        <div className="w-full bg-white rounded-lg shadow  sm:max-w-md   ">
          <div className=" p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              Seller Login
            </h1>

            <form
              className="space-y-4 md:space-y-6"
              action="#"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="mobile"
                  className=" text-sm  font-semibold text-gray-700"
                >
                  Mobile Number
                </label>
                <div className="flex items-center">
                  <select
                    name="country_code"
                    id="country_code"
                    className="bg-gray-50 border text-gray-900 sm:text-sm rounded-md focus:ring-2 focus:outline-none focus:ring-slate-600 p-2.5"
                    value={values.country_code}
                    onChange={handleChange}
                  >
                    <option value="+91">+91</option>
                  </select>
                  <input
                    type="text"
                    name="mobile_number"
                    id="mobile_number"
                    className="bg-gray-50 border w-full text-gray-900 sm:text-sm rounded-md focus:ring-2 focus:outline-none focus:ring-slate-600 p-2.5 ml-2"
                    placeholder="Mobile no"
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

              {/* <div className="flex flex-col gap-1">
                <label
                  htmlFor="email"
                  className=" text-sm  font-semibold text-gray-700"
                >
                  Email ID / username
                </label>
                <div className="flex items-center">
                  <input
                    type="text"
                    name="email_id"
                    id="email_id"
                    className="bg-gray-50 border w-full text-gray-900 sm:text-sm rounded-md focus:ring-2 focus:outline-none focus:ring-slate-600 p-2.5 ml-2"
                    placeholder="abc@abc.com / username123"
                    value={values.email_id}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                {errors.mobile_number && touched.mobile_number ? (
                  <p className="text-red-600 text-[0.75rem] capitalize">
                    {errors.mobile_number}
                  </p>
                ) : null}
              </div> */}
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="password"
                  className=" text-sm font-medium text-gray-900 "
                >
                  Password
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
                {errors.password && touched.password ? (
                  <p className="text-red-600 text-[0.75rem] capitalize">
                    {errors.password}
                  </p>
                ) : null}
              </div>

              <div className=" flex justify-end space-x-1 ">
                <div>
                  <Link
                    to={"/forgetpassword"}
                    className="text-blue-700 text-sm underline"
                  >
                    forget password
                  </Link>
                </div>
                <span> / </span>
                <div>
                  <Link
                    to={"/forgetpassword"}
                    className="text-blue-700 text-sm underline"
                  >
                    forget username
                  </Link>
                </div>
              </div>
              {/* <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    aria-describedby="terms"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 accent-red-500"
                    required
                  />
                </div>
                <div className="ml-3 text-sm ">
                  <label htmlFor="terms" className="font-light text-gray-500">
                    I accept the{" "}
                    <a
                      className="font-medium text-red-600 hover:underline "
                      href="#"
                    >
                      Terms and Conditions
                    </a>
                  </label>
                </div>
              </div> */}

              <div className="flex items-center justify-between gap-3">
                <button
                  type="submit"
                  className="w-[50%] text-slate-200 bg-red-500 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-md text-sm px-5 py-2.5 text-center"
                >
                  Login
                </button>
                <button
                  type="submit"
                  className="  w-[50%] text-black bg-gray-200  focus:ring-3 focus:outline-none focus:ring-primary-300 font-medium rounded-md text-sm px-5 py-2.5 "
                  onClick={handleCancel}
                >
                  cancel
                </button>
              </div>

              <div className="flex">
                {/* <span> or </span> */}
                <Link to={"/OTP"} className="text-blue-700 text-sm underline">
                  Login with OTP
                </Link>
              </div>
            </form>

            {/* <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-100">Or Login with</span>
              </div>
            </div> */}

            {/* <div className="mt-6 grid grid-cols-3 gap-3">
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
            </div> */}

            <p className="text-sm  text-gray-500   font-medium">
              Dont have an account?{" "}
              <Link
                to="/sellersignup"
                className=" text-red-600 hover:underline "
              >
                Sign Up
              </Link>
            </p>
          </div>
          {/* <div className=" flex justify-end mb-3 p-2">
            <button
              type="submit"
              className=" text-black bg-gray-200  focus:ring-3 focus:outline-none focus:ring-primary-300 font-medium rounded-md text-sm px-5 py-2.5 "
              onClick={handleCancel}
            >
              cancel
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default SellerLogin;
