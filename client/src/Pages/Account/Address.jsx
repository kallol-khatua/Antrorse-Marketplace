import React, { useEffect, useState } from "react";

import axios from "axios";

const Address = () => {
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [landMark, setlandMark] = useState("");
  const [phone_number, setphone_number] = useState("");
  const [country, setCountry] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [type, setType] = useState("");

  const [address, setAddress] = useState([]);

  useEffect(() => {
    console.log("City:", city);
    console.log("State:", state);
    console.log("landMark:", landMark);
    console.log("Mobile:", phone_number);
    console.log("Country:", country);
    console.log("Pin Code:", pinCode);
    console.log("Type:", type);
  }, [city, state, landMark, phone_number, country, pinCode, type]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Construct the data object
    const formData = {
      city,
      state,
      landMark,
      phone_number,
      country,
      pinCode,
      type,
    };

    console.log(formData);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/app/user/createAddress`,
        formData,
        {
          headers: {
            token: localStorage.getItem("authToken"),
          },
        }
      );

      // Handle success
      console.log("Form data sent successfully:", response.data);
      fetchAddressData();
    } catch (error) {
      // Handle error
      console.error("Failed to send form data:", error);
    }
  };

  const fetchAddressData = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/app/user/getAddress`,
      {
        headers: {
          token: localStorage.getItem("authToken"),
        },
      }
    );

    console.log(response.data.result, "address");

    setAddress(() => response.data.result);
  };

  useEffect(() => {
    fetchAddressData();
  }, []);

  return (
    <div className="p">
      {address && address.length > 0 && (
  <span>Available House address</span>
)}

    
      <div className="flex gap-2 my-4 ">
        {address && address.length > 0 && address?.map((add, index) => (
          
          <div
            key={index}
            className={` flex flex-row-reverse rounded-md items-center justify-between px-2 ring-1  cursor-pointer ring-gray-700`}
          >
        
            <span className="font-semibold text-sm py-2 px-4">
              {`${add?.landMark} ${add?.city} `}
            </span>
          </div>
        ))}

        {/* 
          ""
        ) : (
          <span className=" ring-1 rounded-md flex items-center justify-center p-0">
            + Create new address
          </span>
        )} */}
      </div>
      {(
        <div className="w-full md:w-3/4 md:max-w-full mx-auto p-1">
          <h2 className="text-center text-2xl font-semibold mb-4">
            Add Address
          </h2>
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
                  <span className="text-gray-700">Phone_number</span>
                  <input
                    name="phone_number"
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
                    value={phone_number}
                    onChange={(e) => setphone_number(e.target.value)}
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
                <span className="text-gray-700">Home </span>
                <input
                  name="landMark"
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
                  value={landMark}
                  onChange={(e) => setlandMark(e.target.value)}
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
      ) }
    </div>
  );
};

export default Address;
