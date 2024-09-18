import React, { useState } from "react";

import axios from "axios";

const Address = () => {
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [street, setStreet] = useState("");
  const [mobile, setMobile] = useState("");
  const [country, setCountry] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [type, setType] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Construct the data object
    const formData = {
      city,
      state,
      street,
      mobile,
      country,
      pinCode,
      type,
    };
    // console.log(formData);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/app/user/createAddress`,
        formData,
        {
          headers: {
            token:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjViYjU2OTdhMzIzYzUxNTFlNzE4MzE5IiwiaWF0IjoxNzA3NzMxOTk1LCJleHAiOjE3MDc5OTExOTV9.ni6EUcXaRRWyt734qe0McvquG2eKMohBMl_U97KqY6E",
          },
        }
      );

      // Handle success
      console.log("Form data sent successfully:", response.data);
    } catch (error) {
      // Handle error
      console.error("Failed to send form data:", error);
    }
  };

  return (
    <div className="p">
      <div className="w-full md:w-3/4 md:max-w-full mx-auto p-1">
        <h2 className="text-center text-2xl font-semibold mb-4">Add Address</h2>
        <div className="p-6 border border-gray-100   bg-white sm:rounded-md">
          <form onSubmit={handleSubmit}>
            <div className="flex gap-2">
              <label className="block mb-6 w-full">
                <span className="text-gray-700">Type</span>
                <input
                  name="name"
                  type="text"
                  className="
              block
              w-full
              mt-1
              p-3
               border
              border-gray-400
                 rounded-md
                shadow-sm
               
                "
                  placeholder="Home ,office"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                />
              </label>
              <label className="block mb-6 w-full">
                <span className="text-gray-700">Mobile No</span>
                <input
                  name="telephone"
                  type="text"
                  className="
              block
              w-full p-3
              mt-1
              border
                border-gray-400
              rounded-md
              shadow-sm
              focus:border-indigo-300
              focus:ring
              focus:ring-indigo-200
              focus:ring-opacity-50
              "
                  placeholder=""
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />
              </label>
            </div>

            <div className="flex gap-2">
              <label className="block mb-6 w-full">
                <span className="text-gray-700">Zip/Postal code</span>
                <input
                  name="zip"
                  type="text"
                  className="
              block
              w-full p-3
              mt-1
              
                rounded-md
                shadow-sm
                border
                border-gray-400
                focus:border-indigo-300
                focus:ring
                focus:ring-indigo-200
                focus:ring-opacity-50
                "
                  placeholder=""
                  value={pinCode}
                  onChange={(e) => setPinCode(e.target.value)}
                />
              </label>
              <label className="block mb-6 w-full">
                <span className="text-gray-700">Country</span>
                <input
                  name="country"
                  type="text"
                  className="
              block
              w-full
              mt-1 p-3
              border
              border-gray-400
              
              rounded-md
              shadow-sm
              focus:border-indigo-300
              focus:ring
              focus:ring-indigo-200
              focus:ring-opacity-50
              "
                  placeholder=""
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
              </label>
            </div>
            <label className="block mb-6">
              <span className="text-gray-700">Address </span>
              <input
                name="address1"
                type="text"
                className="
              block
              w-full
                mt-1
                p-6
                border
                border-gray-400
                
                rounded-md
                shadow-sm
                focus:border-indigo-300
                focus:ring
                focus:ring-indigo-200
                focus:ring-opacity-50
                
                "
                placeholder=" "
                value={street}
                onChange={(e) => setStreet(e.target.value)}
              />
            </label>

            <div className="flex gap-2">
              <label className="block mb-6 w-full">
                <span className="text-gray-700">city</span>
                <input
                  name="state"
                  type="text"
                  className="
              block
              w-full p-3
              mt-1
              border
              border-gray-400
            
              rounded-md
              shadow-sm
                focus:border-indigo-300
                focus:ring
                focus:ring-indigo-200
                focus:ring-opacity-50
                "
                  placeholder=""
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </label>
              <label className="block mb-6 w-full">
                <span className="text-gray-700">State</span>
                <input
                  name="state"
                  type="text"
                  className="
              block
              w-full p-3
              mt-1
              border
              border-gray-400
            
              rounded-md
              shadow-sm
                focus:border-indigo-300
                focus:ring
                focus:ring-indigo-200
                focus:ring-opacity-50
                "
                  placeholder=""
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                />
              </label>
            </div>

            {/* <label className="block mb-6">
            <span className="text-gray-700">Delivery information</span>
            <textarea
              name="message"
              className="
              block
              w-full p-2
              mt-1
              border-2
              border-gray-600
              rounded-md
              shadow-sm
              focus:border-indigo-300
              focus:ring
              focus:ring-indigo-200
              focus:ring-opacity-50
              "
              rows="3"
              placeholder="floor/door lock code/etc."
              ></textarea>
          </label> */}
            <div className="mb-6">
              <button
                type="submit"
                className="
              h-10
              px-5
              text-indigo-100
              bg-indigo-700
              rounded-lg
              transition-colors
              duration-150
              focus:shadow-outline
              hover:bg-indigo-800
              "
              >
                Save
              </button>
            </div>
            <div></div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Address;import React, { useState } from "react";

import axios from "axios";

const Address = () => {
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [street, setStreet] = useState("");
  const [mobile, setMobile] = useState("");
  const [country, setCountry] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [type, setType] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Construct the data object
    const formData = {
      city,
      state,
      street,
      mobile,
      country,
      pinCode,
      type,
    };
    // console.log(formData);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/app/user/createAddress`,
        formData,
        {
          headers: {
            token:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjViYjU2OTdhMzIzYzUxNTFlNzE4MzE5IiwiaWF0IjoxNzA3NzMxOTk1LCJleHAiOjE3MDc5OTExOTV9.ni6EUcXaRRWyt734qe0McvquG2eKMohBMl_U97KqY6E",
          },
        }
      );

      // Handle success
      console.log("Form data sent successfully:", response.data);
    } catch (error) {
      // Handle error
      console.error("Failed to send form data:", error);
    }
  };

  return (
    <div className="p">
      <div className="w-full md:w-3/4 md:max-w-full mx-auto p-1">
        <h2 className="text-center text-2xl font-semibold mb-4">Add Address</h2>
        <div className="p-6 border border-gray-100   bg-white sm:rounded-md">
          <form onSubmit={handleSubmit}>
            <div className="flex gap-2">
              <label className="block mb-6 w-full">
                <span className="text-gray-700">Type</span>
                <input
                  name="name"
                  type="text"
                  className="
              block
              w-full
              mt-1
              p-3
               border
              border-gray-400
                 rounded-md
                shadow-sm
               
                "
                  placeholder="Home ,office"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                />
              </label>
              <label className="block mb-6 w-full">
                <span className="text-gray-700">Mobile No</span>
                <input
                  name="telephone"
                  type="text"
                  className="
              block
              w-full p-3
              mt-1
              border
                border-gray-400
              rounded-md
              shadow-sm
              focus:border-indigo-300
              focus:ring
              focus:ring-indigo-200
              focus:ring-opacity-50
              "
                  placeholder=""
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />
              </label>
            </div>

            <div className="flex gap-2">
              <label className="block mb-6 w-full">
                <span className="text-gray-700">Zip/Postal code</span>
                <input
                  name="zip"
                  type="text"
                  className="
              block
              w-full p-3
              mt-1
              
                rounded-md
                shadow-sm
                border
                border-gray-400
                focus:border-indigo-300
                focus:ring
                focus:ring-indigo-200
                focus:ring-opacity-50
                "
                  placeholder=""
                  value={pinCode}
                  onChange={(e) => setPinCode(e.target.value)}
                />
              </label>
              <label className="block mb-6 w-full">
                <span className="text-gray-700">Country</span>
                <input
                  name="country"
                  type="text"
                  className="
              block
              w-full
              mt-1 p-3
              border
              border-gray-400
              
              rounded-md
              shadow-sm
              focus:border-indigo-300
              focus:ring
              focus:ring-indigo-200
              focus:ring-opacity-50
              "
                  placeholder=""
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
              </label>
            </div>
            <label className="block mb-6">
              <span className="text-gray-700">Address </span>
              <input
                name="address1"
                type="text"
                className="
              block
              w-full
                mt-1
                p-6
                border
                border-gray-400
                
                rounded-md
                shadow-sm
                focus:border-indigo-300
                focus:ring
                focus:ring-indigo-200
                focus:ring-opacity-50
                
                "
                placeholder=" "
                value={street}
                onChange={(e) => setStreet(e.target.value)}
              />
            </label>

            <div className="flex gap-2">
              <label className="block mb-6 w-full">
                <span className="text-gray-700">city</span>
                <input
                  name="state"
                  type="text"
                  className="
              block
              w-full p-3
              mt-1
              border
              border-gray-400
            
              rounded-md
              shadow-sm
                focus:border-indigo-300
                focus:ring
                focus:ring-indigo-200
                focus:ring-opacity-50
                "
                  placeholder=""
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </label>
              <label className="block mb-6 w-full">
                <span className="text-gray-700">State</span>
                <input
                  name="state"
                  type="text"
                  className="
              block
              w-full p-3
              mt-1
              border
              border-gray-400
            
              rounded-md
              shadow-sm
                focus:border-indigo-300
                focus:ring
                focus:ring-indigo-200
                focus:ring-opacity-50
                "
                  placeholder=""
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                />
              </label>
            </div>

            {/* <label className="block mb-6">
            <span className="text-gray-700">Delivery information</span>
            <textarea
              name="message"
              className="
              block
              w-full p-2
              mt-1
              border-2
              border-gray-600
              rounded-md
              shadow-sm
              focus:border-indigo-300
              focus:ring
              focus:ring-indigo-200
              focus:ring-opacity-50
              "
              rows="3"
              placeholder="floor/door lock code/etc."
              ></textarea>
          </label> */}
            <div className="mb-6">
              <button
                type="submit"
                className="
              h-10
              px-5
              text-indigo-100
              bg-indigo-700
              rounded-lg
              transition-colors
              duration-150
              focus:shadow-outline
              hover:bg-indigo-800
              "
              >
                Save
              </button>
            </div>
            <div></div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Address;