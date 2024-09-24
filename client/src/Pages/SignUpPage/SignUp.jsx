import { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
// import { FaFacebook } from "react-icons/fa";
// import { FaXTwitter } from "react-icons/fa6";
// import { FcGoogle } from "react-icons/fc";

import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuth } from "../../redux/features/User/UserSlice";

const SignUp = () => {
  const dispatch = useDispatch();

  const initialValues = {
    name: "",
    mobile_number: "",
    email: "",
    password: "",
    confirmPassword: "",
    isAcceptTermsAndConditions: false,
  };

  const signUpSchema = Yup.object({
    name: Yup.string().min(3).required("Please enter your name"),
    mobile_number: Yup.string()
      .matches(/^\d{10}$/, "Mobile number must be 10 digits")
      .required("A phone number is required"),
    // email: Yup.string().email().required("Please enter your email"),
    password: Yup.string().min(8).required("Please enter password"),
    confirmPassword: Yup.string()
      .min(8)
      .required("Please enter confirm password"),
    isAcceptTermsAndConditions: Yup.boolean().required("Please accept Terms and Conditions"),
  });

  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: signUpSchema,
      onSubmit: async (values) => {
        // console.log(values);
        try {
          const url = `${import.meta.env.VITE_BACKEND_URL}/user/register`;
          const response = await axios.post(url, values);

          if (response.status === 201) {
            // console.log(response);
            // console.log(response.data);
            dispatch(setAuth(true));
            localStorage.setItem("isAuthorizedUser", JSON.stringify(true));
            localStorage.setItem(
              "authToken",
              JSON.stringify(response.data.authToken)
            );
            navigate(-1);
          }
        } catch (error) {
          console.error("Error while creating account");
        }
      },
    });

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const goToLoginPage = () => {
    navigate("/login", { replace: true });
  };

  const handleCancel = () => {
    navigate(-1);
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
                    Email ID (Optional)
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
                    className="w-full text-slate-200 bg-red-500 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-md text-sm px-5 py-2.5 text-center mt-2"
                  >
                    Create an Account
                  </button>

                  {/* Cancel Button */}
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="w-full text-gray-600 border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-md text-sm px-5 py-2.5 text-center mt-2"
                  >
                    Cancel
                  </button>
                </div>

                {errorMessage && (
                  <p className="text-red-600 text-[0.75rem]">{errorMessage}</p>
                )}
              </form>

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

              <p className="text-sm text-gray-500 font-medium">
                Already have an account?{" "}
                <span
                  onClickCapture={goToLoginPage}
                  className=" text-red-600 hover:underline cursor-pointer"
                >
                  Login here
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignUp;
