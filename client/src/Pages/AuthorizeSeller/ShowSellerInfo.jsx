import { useEffect, useState } from "react";
import AdminAxiosInstance from "../../AdminAxiosInstance";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ShowProductList from "./ShowProductList";

const ProfileItem = ({ label, value }) => (
  <div>
    <h3 className="text-sm font-medium text-gray-600">{label}</h3>
    <p className="text-lg text-gray-800">{value}</p>
  </div>
);

function ShowSellerInfo() {
  const [sellerData, setSellerData] = useState(null);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const { sellerId } = useParams();

  // Function to get seller data - seller info and it's created pickup location
  const getSellerData = async () => {
    try {
      const url = `/admin/get-seller-info?sellerId=${sellerId}`;

      const response = await AdminAxiosInstance.get(url);

      if (response.status === 200) {
        setSellerData(response.data.sellerData);
      }
    } catch (error) {
      console.log("Error while fetching seller details and products");
    }
  };

  useEffect(() => {
    getSellerData();
  }, [navigate, sellerId]);

  // console.log(sellerData);

  // Function to handel marking seller pickup location verified
  const handelSellerPickupLocationVerify = async () => {
    try {
      const url =
        "/admin/authorize-seller/mark-seller-pickup-location-verified";
      const response = await AdminAxiosInstance.post(url, {
        sellerId: sellerData._id,
      });

      if (response.status === 200) {
        getSellerData();
        toast.success("Seller pickup location marked as verified");
      }
    } catch (error) {
      toast.error("Error while marking seller pickup location as verified");
    }
  };

  // Handle approve seller - approve seller, also approve all product that are added by seller
  const handelApproveSeller = async () => {
    try {
      const url = "/admin/approve-seller";
      const data = {
        sellerId: sellerId,
      };

      const response = await AdminAxiosInstance.post(url, data);

      if (response.status === 200) {
        toast.success("Seller approved successfully");
        navigate("/admin/authorize-seller");
      }
    } catch (error) {
      toast.error("Error while approving seller");
      console.log("Error while approving seller");
    }
  };

  // Handle reject seller - reject seller, also reject all product that are added by seller
  const handelRejectSeller = async () => {
    try {
      const url = "/admin/reject-seller";
      const data = {
        sellerId: sellerId,
      };

      const response = await AdminAxiosInstance.post(url, data);

      if (response.status === 200) {
        toast.success("Seller approval rejected successfully");
        navigate("/admin/authorize-seller");
      }
    } catch (error) {
      toast.error("Error while rejecting seller approval");
      console.log("Error while rejecting seller approval");
    }
  };

  return (
    <div>
      <h2 className=" text-2xl shadow-sm font-bold text-center border-b mb-2 pb-4">
        Authorize seller
      </h2>
      {sellerData && (
        <>
          {sellerData.isPickUpLocationAdded && (
            <div className="bg-white p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Seller Data
              </h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <ProfileItem label="Name" value={sellerData.name} />
                <ProfileItem label="Email" value={sellerData.email} />
                <ProfileItem
                  label="Mobile Number"
                  value={sellerData.mobile_number}
                />
                <ProfileItem
                  label="Company Name"
                  value={sellerData.company_name}
                />
                <ProfileItem
                  label="Pickup Location Nick Name"
                  value={sellerData.pickup_location}
                />
                <ProfileItem
                  label="Pickup Location Id"
                  value={sellerData.pickup_id}
                />
                <ProfileItem
                  label="Pickup Location RTO Address Id"
                  value={sellerData.rto_address_id}
                />
                <ProfileItem
                  label="Address"
                  value={sellerData.sellerPickupLocation[0].address}
                />
                {sellerData.sellerPickupLocation[0].address_2 && (
                  <ProfileItem
                    label="Address 2"
                    value={sellerData.sellerPickupLocation[0].address_2}
                  />
                )}
                <ProfileItem
                  label="State"
                  value={sellerData.sellerPickupLocation[0].state}
                />
                <ProfileItem
                  label="City"
                  value={sellerData.sellerPickupLocation[0].city}
                />
                <ProfileItem
                  label="Country"
                  value={sellerData.sellerPickupLocation[0].country}
                />
                <ProfileItem
                  label="Pincode"
                  value={sellerData.sellerPickupLocation[0].pin_code}
                />
              </div>
            </div>
          )}
          {sellerData.is_pickup_location_verified ? (
            <div className="text-xl font-semibold ml-3">
              Seller pickup location verified
            </div>
          ) : (
            <div className="flex gap-5">
              <div className="text-xl font-semibold ml-3">
                Verify seller pickup location
              </div>
              <button
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                onClick={handelSellerPickupLocationVerify}
              >
                Mark as verified
              </button>
            </div>
          )}
        </>
      )}

      <ShowProductList />

      {/* At the end */}
      <div className="flex justify-center gap-5 my-5">
        <button
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          onClick={handelApproveSeller}
        >
          Approve seller
        </button>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={handelRejectSeller}
        >
          Reject seller
        </button>
      </div>
    </div>
  );
}

export default ShowSellerInfo;
