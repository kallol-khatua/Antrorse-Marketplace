/* eslint-disable react/prop-types */

import { toast } from "react-toastify";
import AdminAxiosInstance from "../../AdminAxiosInstance";

function AuthorizeSeller({ seller, getSellerData }) {
  // console.log(seller);
  const handleApprove = async () => {
    try {
      const url = `/admin/approve-seller`;
      const response = await AdminAxiosInstance.post(url, {
        sellerId: seller._id,
      });

      if (response.status === 200) {
        toast.success(response.data.message);
        getSellerData();
      }
    } catch (error) {
      // console.log(error);
      console.log("Error while approving seller");
    }
  };

  const handleReject = async () => {
    try {
      const url = `/admin/reject-seller`;
      const response = await AdminAxiosInstance.post(url, {
        sellerId: seller._id,
      });

      if (response.status === 200) {
        toast.success(response.data.message);
        getSellerData();
      }
    } catch (error) {
      console.log("Error while rejecting seller");
    }
  };

  return (
    <div className="rounded-lg overflow-hidden shadow-xl border norder-2 py-4 px-3">
      <div>Company name: {seller.company_name}</div>
      <div>GST number: {seller.gst_number}</div>
      <div>Seller name: {seller.name}</div>
      <div>Company email: {seller.email}</div>
      <div>Mobile number: {seller.mobile_number}</div>
      <div className="mt-2 flex justify-center gap-3">
        <button
          onClick={handleApprove}
          type="button"
          className="w-1/3 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Approve
        </button>
        <button
          onClick={handleReject}
          type="button"
          className="w-1/3 bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
        >
          Reject
        </button>
      </div>
    </div>
  );
}

export default AuthorizeSeller;
