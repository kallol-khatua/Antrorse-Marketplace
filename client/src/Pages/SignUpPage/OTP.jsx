// Import the necessary dependencies
import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const OTP = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Extracting userData from the location state
  const { userData } = location.state || {};

  const handleVerify = async () => {
    try {
      // Make a fetch request to your backend API to verify the OTP
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/app/user/registration`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            otp: otp,
            user_name: userData?.name,
            email: userData?.email,
            mobile_number: userData?.mobile,
            // Add any other required parameters here
          }),
        }
      );

      if (response.ok) {
        // If registration is successful, you can redirect to the desired page
        // For now, let's alert a success message
        alert("Registration successful!");
        // Redirect to the home page or any other page after successful registration
        navigate("/createPassword", { state: { userData } });
      } else {
        // Handle the case where registration failed
        console.error("Registration failed");
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <div className="flex flex-col">
      <section className="bg-gray-50 h-screen flex-1">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto">
          <div className="w-full bg-white rounded-lg shadow sm:max-w-md">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Enter OTP
              </h1>

              <form className="space-y-4 md:space-y-6">
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="otp"
                    className="text-sm font-medium text-gray-900"
                  >
                    Enter OTP sent to your mobile
                  </label>
                  <input
                    type="text"
                    id="otp"
                    className="bg-gray-50 border text-gray-900 sm:text-sm rounded-md focus:ring-2 focus:outline-none focus:ring-slate-600 block w-full p-2.5"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </div>

                {/* Verify OTP Button */}
                <div>
                  <button
                    type="button"
                    onClick={handleVerify}
                    className="w-full text-slate-200 bg-red-500 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-md text-sm px-5 py-2.5 text-center mt-4"
                  >
                    Verify OTP
                  </button>
                </div>
              </form>

              {/* Login Link */}
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

export default OTP;
