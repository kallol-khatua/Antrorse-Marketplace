import React, { useEffect, useState } from "react";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { auth } from "../../redux/features/User/UserSlice";
import axios from "axios";

const Login = () => {
  // const credentials = {
  //   username: "admin123@gmail.com",
  //   password: "123456",
  // };

  const initialValues = {
    email_id: "",
    mobile_number: "",
    password: "",
  };

  const loginSchema = Yup.object({
    // name: Yup.string().min(1).required("Please enter your username"),
    password: Yup.string().min(1).required("Please enter your password"),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: loginSchema,

      onSubmit: async () => {
        try {
          const res = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/app/user/login`,
            {
              mobile_number: values.mobile_number,
              password: values.password,
            }
          );

          console.log(res.data.result);
          if (res.data.responseCode === 200) {
            toast.success(res.data.responseMessage);
            localStorage.setItem("authToken", res.data.result);
            // Dispatch to Redux store if needed

            dispatch(auth(true));
            navigate("/");
          } else {
            toast.error(res.data.responseMessage);
          }
        } catch (error) {
          console.log(error);
          toast.error("An error occurred while trying to log in.");
        }
      },
    });

  const Validation = (username, password) => {
    const status =
      username.toLowerCase() === credentials.username &&
      password === credentials.password;

    console.log("hello");

    dispatch(auth(status));

    if (status) {
      toast.success("user validated");
      navigate("/");
    } else {
      toast.error("Entered credentials is invalid");
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="bg-gray-50   flex-1  ">
      <div className="flex flex-col items-center justify-center  px-6 py-8 mx-auto ">
        <div className="w-full bg-white rounded-lg shadow  sm:max-w-md   ">
          <div className=" p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              Login
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

              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="w-[50%] text-slate-200 bg-red-500 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-md text-sm px-5 py-2.5 text-center"
                >
                  Login
                </button>
                <button
                  type="submit"
                  className="  w-[20%] text-black bg-gray-200  focus:ring-3 focus:outline-none focus:ring-primary-300 font-medium rounded-md text-sm px-5 py-2.5 "
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

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-100">Or Login with</span>
              </div>
            </div>

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

            <p className="text-sm  text-gray-500   font-medium">
              Dont have an account?{" "}
              <Link to="/signup" className=" text-red-600 hover:underline ">
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
      <Toaster position="top-center" containerStyle={{ top: "8rem" }} />
    </div>
  );
};

export default Login;
