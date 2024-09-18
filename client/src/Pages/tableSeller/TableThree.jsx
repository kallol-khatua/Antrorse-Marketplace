import React, { useState, useEffect } from "react";
import axios from "axios";
const TableThree = ({ activeComponent }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from backend when component mounts
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Make GET request to your backend API to fetch data
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/app/admin/totalSeller`
      );
      setData(response.data.result); // Assuming response.data is an array of objects
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  console.log(data);
  console.log(activeComponent);
  return (
    <div className="rounded-sm border border-gray-200 bg-white px-5 pt-2 pb-2.5 shadow-lg   sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-[#F7F9FC] border-b-2  text-left text-lg font-bold ">
              <th className="min-w-[220px] py-4 px-4 font-semiBold text-gray-800  xl:pl-11">
                {activeComponent === "seller" ? "Seller Name" : "Package"}
              </th>
              <th className="min-w-[150px] py-4 px-4  font-semiBold text-gray-800 ">
                {activeComponent === "seller"
                  ? "Register date"
                  : "Invoice date"}
              </th>
              <th className="min-w-[120px] py-4 px-4 font-semiBold text-gray-800 ">
                {activeComponent === "seller" ? "Email" : "Email"}
              </th>
              <th className="py-4 px-4 font-semiBold text-gray-800">
                {activeComponent === "seller" ? "Mobile" : "Mobile"}
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, _id) => (
              <tr key={item._id}>
                {/* {console.log(item._id)} */}
                <td className="border-b border-[#eee] py-5 px-4 pl-9  xl:pl-11">
                  <h5 className="font-medium text-black">{item.fullName}</h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 ">
                  <p className="text-black ">{item.createdAt}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 ">
                  <p className="text-black ">{item.email_id}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 ">
                  <p className="text-black ">{item.mobile_number}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableThree;
