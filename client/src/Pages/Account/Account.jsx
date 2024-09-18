import { useState } from "react";
import { BiHide, BiShow } from "react-icons/bi";
import { Link } from "react-router-dom";
import Orders from "../Order/Order";

const Account = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [emailEditable, setEmailEditable] = useState(false);
  const [mobileEditable, setMobileEditable] = useState(false);
  const [email, setEmail] = useState("john.doe@company.com");
  const [mobileNumber, setMobileNumber] = useState("123-456-7890");
  const [showNotification, setShowNotification] = useState(false);
  const [emailSavedNotification, setEmailSavedNotification] = useState(false);
  const [mobileSavedNotification, setMobileSavedNotification] = useState(false);
  const [orderComponent, setOrderComponent] = useState(false);
  const [passwordSavedNotification, setPasswordSavedNotification] =
    useState(false);

  const togglePasswordVisibility = (passwordType) => {
    if (passwordType === "current") {
      setShowCurrentPassword(!showCurrentPassword);
    } else {
      setShowNewPassword(!showNewPassword);
    }
  };

  const toggleEmailEditable = () => {
    setEmailEditable(!emailEditable);
  };

  const toggleMobileEditable = () => {
    setMobileEditable(!mobileEditable);
  };

  const saveChanges = (section) => {
    switch (section) {
      case "email":
        if (email !== "john.doe@company.com") {
          setEmailSavedNotification(true);
          setTimeout(() => {
            setEmailSavedNotification(false);
          }, 3000);
        }
        break;
      case "mobile":
        if (mobileNumber !== "123-456-7890") {
          setMobileSavedNotification(true);
          setTimeout(() => {
            setMobileSavedNotification(false);
          }, 3000);
        }
        break;
      case "password":
        setPasswordSavedNotification(true);
        setTimeout(() => {
          setPasswordSavedNotification(false);
        }, 3000);
        break;
      default:
        break;
    }

    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  return (
    <div>
      <link
        href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400;600;700&display=swap"
        rel="stylesheet"
      />

      <div className="mx-4 min-h-screen max-w-screen-xl sm:mx-8 xl:mx-auto">
        <h1 className="border-b py-6 text-4xl font-semibold text-left">
          Settings
        </h1>
        {/* Common Notification */}
        {/* {showNotification && (
          <div className="mt-2 text-green-500">Changes Saved Successfully!</div>
        )} */}
        <div className=" flex justify-start pt-3 ">
          {/* <div className="relative my-4 w-56 sm:hidden">
            <input
              className="peer hidden"
              type="checkbox"
              name="select-1"
              id="select-1"
            />
            <label
              htmlFor="select-1"
              className="flex w-full cursor-pointer select-none rounded-lg border p-2 px-3 text-sm text-gray-700 ring-blue-700 peer-checked:ring"
            >
              Accounts
            </label>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="pointer-events-none absolute right-0 top-3 ml-auto mr-5 h-4 text-slate-700 transition peer-checked:rotate-180"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
            <ul className="max-h-0 select-none flex-col overflow-hidden rounded-b-lg shadow-md transition-all duration-300 peer-checked:max-h-56 peer-checked:py-3">
              <li className="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-blue-700 hover:text-white">
                Accounts
              </li>
              <li className="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-blue-700 hover:text-white">
                Team
              </li>
              <li className="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-blue-700 hover:text-white">
                Others
              </li>
            </ul>
          </div> */}

          <div className=" w-1/4">
            <ul>
              <li className="mt-5 cursor-pointer border-l-2 border-transparent px-2 py-2 font-semibold transition hover:border-l-blue-700 hover:text-blue-700">
                Profile
              </li>
              <li className="mt-5 cursor-pointer border-l-2 border-l-blue-700 px-2 py-2 font-semibold text-blue-700 transition hover:border-l-blue-700 hover:text-blue-700">
                Account Settings
              </li>

              <li
                onClick={() => setOrderComponent(!orderComponent)}
                className="mt-5 cursor-pointer border-l-2  px-2 py-2 font-semibold  transition hover:border-l-blue-700 hover:text-blue-700"
              >
                Orders
              </li>

              <li className="mt-5 cursor-pointer border-l-2 border-transparent px-2 py-2 font-semibold transition hover:border-l-blue-700 hover:text-blue-700">
                Payment Method
              </li>
              <li className="mt-5 cursor-pointer border-l-2 border-transparent px-2 py-2 font-semibold transition hover:border-l-blue-700 hover:text-blue-700">
                Address
              </li>
              <li className="mt-5 cursor-pointer border-l-2 border-transparent px-2 py-2 font-semibold transition hover:border-l-blue-700 hover:text-blue-700">
                Notifications
              </li>
              <li className="mt-5 cursor-pointer border-l-2 border-transparent px-2 py-2 font-semibold transition hover:border-l-blue-700 hover:text-blue-700">
                Help & Support
              </li>
            </ul>
          </div>

          <div className="w-3/4">
            {!orderComponent ? (
              <div className="flex flex-col flex-1 overflow-hidden rounded-xl sm:bg-gray-50 sm:px-8 sm:shadow">
                <div className="pt-4">
                  <h1 className="py-2 text-2xl font-semibold text-left">
                    Account settings
                  </h1>
                  <p className="font- text-slate-600">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  </p>
                </div>
                <hr className="mt-4 mb-8" />

                {/* Email Section */}
                <p className="py-2 text-xl font-semibold text-left">
                  Email Address
                </p>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  {emailEditable ? (
                    <input
                      type="text"
                      className="border-2 border-gray-300 py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  ) : (
                    <p className="text-gray-600">
                      Your email address is <strong>{email}</strong>
                    </p>
                  )}
                  <button
                    onClick={() => {
                      setEmailEditable(!emailEditable);
                      saveChanges("email");
                    }}
                    className="inline-flex text-sm font-semibold text-blue-600 underline decoration-2"
                  >
                    {emailEditable ? "Save" : "Edit"}
                  </button>
                </div>
                {emailSavedNotification && (
                  <div className="mt-2 text-green-500">
                    Email Saved Successfully!
                  </div>
                )}
                <hr className="mt-4 mb-8" />

                {/* Mobile Number Section */}
                <p className="py-2 text-xl font-semibold text-left">
                  Mobile Number
                </p>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  {mobileEditable ? (
                    <input
                      type="text"
                      className="border-2 border-gray-300 py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                    />
                  ) : (
                    <p className="text-gray-600">
                      Your mobile number is <strong>{mobileNumber}</strong>
                    </p>
                  )}
                  <button
                    onClick={() => {
                      setMobileEditable(!mobileEditable);
                      saveChanges("mobile");
                    }}
                    className="inline-flex text-sm font-semibold text-blue-600 underline decoration-2"
                  >
                    {mobileEditable ? "Save" : "Edit"}
                  </button>
                </div>
                {mobileSavedNotification && (
                  <div className="mt-2 text-green-500">
                    Mobile Number Saved Successfully!
                  </div>
                )}
                <hr className="mt-4 mb-8" />

                <p className="py-2 text-xl font-semibold text-left">
                  Manage Password
                </p>
                <div className="flex items-start">
                  <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-3">
                    <label htmlFor="current-password">
                      <span className="text-sm text-gray-500">
                        Current Password
                      </span>
                      <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                        <input
                          type={showCurrentPassword ? "text" : "password"}
                          id="current-password"
                          className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                          placeholder="*****"
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                          <button
                            onClick={() => togglePasswordVisibility("current")}
                            className="text-gray-500 focus:outline-none"
                          >
                            {showCurrentPassword ? (
                              <BiHide className="w-5 h-5" />
                            ) : (
                              <BiShow className="w-5 h-5" />
                            )}
                          </button>
                        </div>
                      </div>
                    </label>
                    <label htmlFor="new-password">
                      <span className="text-sm text-gray-500">
                        New Password
                      </span>
                      <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                        <input
                          type={showNewPassword ? "text" : "password"}
                          id="new-password"
                          className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                          placeholder="*****"
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                          <button
                            onClick={() => togglePasswordVisibility("new")}
                            className="text-gray-500 focus:outline-none"
                          >
                            {showNewPassword ? (
                              <BiHide className="w-5 h-5" />
                            ) : (
                              <BiShow className="w-5 h-5" />
                            )}
                          </button>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>

                <button
                  onClick={() => {
                    saveChanges("password");
                  }}
                  className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white w-fit"
                >
                  Save Password
                </button>
                {passwordSavedNotification && (
                  <div className="mt-2 text-green-500">
                    Password Saved Successfully!
                  </div>
                )}
                <p className="mt-2">
                  Can't remember your current password.{" "}
                  <a
                    className="text-sm font-semibold text-blue-600 underline decoration-2"
                    href="#"
                  >
                    Recover Account
                  </a>
                </p>
                <hr className="mt-4 mb-8" />

                {/* ... existing code ... */}
                <hr className="mt-4 mb-8" />

                <div className="mb-10">
                  <p className="py-2 text-xl font-semibold">Delete Account</p>
                  <p className="inline-flex items-center rounded-full bg-rose-100 px-4 py-1 text-rose-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-2 h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Proceed with caution
                  </p>
                  <p className="mt-2">
                    Make sure you have taken a backup of your account in case
                    you ever need to get access to your data. We will completely
                    wipe your data. There is no way to access your account after
                    this action.
                  </p>
                  <button className="ml-auto text-sm font-semibold text-rose-600 underline decoration-2">
                    Continue with deletion
                  </button>
                </div>
              </div>
            ) : (
              <Orders />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
