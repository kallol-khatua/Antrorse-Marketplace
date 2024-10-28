import { useEffect, useState } from "react";
import axiosInstanceSeller from "../../axiosInstanceSeller";
import { GiSandsOfTime } from "react-icons/gi";
import { TbReport } from "react-icons/tb";
import { MdVerified } from "react-icons/md";
import { toast } from "react-toastify";

const ProfileItem = ({ label, value }) => (
  <div>
    <h3 className="text-sm font-medium text-gray-600">{label}</h3>
    <p className="text-lg text-gray-800">{value}</p>
  </div>
);

const SellerAccount = () => {
  // =================================
  const [sellerInfo, setSellerInfo] = useState(null);
  const [isLoadingSellerInfo, setIsLoadingSellerInfo] = useState(true);
  const [formData, setFormData] = useState({
    pickup_location: "",
    address: "",
    address_2: "",
    city: "",
    state: "",
    country: "",
    pin_code: "",
  });
  const [errors, setErrors] = useState({});

  const getSellerInfo = async () => {
    try {
      const url = "/seller/get-seller-info";
      const response = await axiosInstanceSeller.get(url);

      if (response.status === 200) {
        // console.log(response.data.sellerData);
        setSellerInfo(response.data.sellerData);
        setIsLoadingSellerInfo(false);
      } else {
        throw new Error("Some Error occured");
      }
    } catch (error) {
      setIsLoadingSellerInfo(false);
      console.log("Error while fetching seller info");
    }
  };

  useEffect(() => {
    getSellerInfo();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const validate = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (key !== "address_2" && !formData[key]) {
        newErrors[key] = `${key.replace(/_/g, " ")} is required`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setErrors({});
      console.log(formData);
      // Handle form submission logic here

      try {
        const url = "/seller/create-pickup-location";
        const response = await axiosInstanceSeller.post(url, formData);
        if (response.status === 201) {
          getSellerInfo();
          toast.success("Pickup location added");
        }
      } catch (error) {
        console.log("Error while creating pickup location");
        if (error?.response?.status === 422) {
          if (error?.response?.data?.errors?.pickup_location) {
            setErrors((prev) => ({
              ...prev,
              pickup_location:
                error?.response?.data?.errors?.pickup_location[0],
            }));
          }
          if (error?.response?.data?.errors?.address) {
            setErrors((prev) => ({
              ...prev,
              address: error.response.data.errors.address[0],
            }));
          }
          if (error?.response?.data?.errors?.city) {
            setErrors((prev) => ({
              ...prev,
              city: error.response.data.errors.city[0],
            }));
          }
          if (error?.response?.data?.errors?.state) {
            setErrors((prev) => ({
              ...prev,
              state: error.response.data.errors.state[0],
            }));
          }
          if (error?.response?.data?.errors?.country) {
            setErrors((prev) => ({
              ...prev,
              country: error.response.data.errors.country[0],
            }));
          }
          if (error?.response?.data?.errors?.pin_code) {
            setErrors((prev) => ({
              ...prev,
              pin_code: error.response.data.errors.pin_code[0],
            }));
          }
          if (error?.response?.data?.errors?.address_2) {
            setErrors((prev) => ({
              ...prev,
              address_2: error.response.data.errors.address_2[0],
            }));
          }
        }
      }
    }
  };

  const handleApplyForApproval = async () => {
    try {
      const url = "/seller/apply-for-approval";
      const response = await axiosInstanceSeller.post(url);
      if (response.status === 200) {
        toast.success("Applied successfully");
        getSellerInfo();
      }
    } catch (error) {
      console.log("Error while applying for approval");
    }
  };

  return (
    <div className="min-h-screen">
      {/* Title */}
      <h1 className="border-b py-6 text-4xl font-semibold text-center">
        My Profile
      </h1>

      {/* Content */}
      {sellerInfo ? (
        <div className="pt-3 ">
          {/* Main Content */}
          <div className="overflow-hidden rounded-xl  sm:px-8 mb-5">
            {/* Account settings section */}
            {/* <div className="pt-4">
            <h1 className="py-2 text-2xl font-semibold">Account settings</h1>
            <p className="font- text-slate-600">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            </p>
          </div>
          <hr className="mt-4 mb-8" /> */}

            {/* Profile Name */}
            <div className="flex ">
              <p className="py-5 text-xl font-semibold text-left">Name</p>
              <input
                type="text"
                className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                value={sellerInfo.name}
                readOnly
              />
            </div>
            <hr className="mt-4 mb-8" />

            {/* Email ID */}
            <div className="flex ">
              <div className="w-1/5 py-2 text-md font-semibold text-left">
                Email ID
              </div>
              <input
                type="text"
                className=" w-4/5 py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                value={sellerInfo.email}
                readOnly
              />
            </div>

            <hr className="mt-4 mb-8" />

            {/* Mobile number */}
            <div className="flex ">
              <div className="w-1/5 py-2 text-md font-semibold text-left">
                Mobile Number
              </div>
              <input
                type="text"
                className=" w-4/5 py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                value={sellerInfo.mobile_number}
                readOnly
              />
            </div>

            <hr className="mt-4 mb-8" />

            {/* Addresses */}
            {/* <p className="py-2 text-xl font-semibold text-left">Addresses</p>
            <div className="flex items-center">
              <div className="flex flex-col space-y-2">
                <label>
                  <span className="text-sm text-gray-500 text-left">
                    Billing Address
                  </span>
                </label>
                <label>
                  <span className="text-sm text-gray-500 text-left">
                    Shop Address
                  </span>
                </label>
              </div>
            </div>
            <hr className="mt-4 mb-8" /> */}

            <p className="py-2 text-xl font-semibold text-left">
              Pickup location
            </p>
            {!sellerInfo.isPickUpLocationAdded ? (
              <form
                onSubmit={handleSubmit}
                className="p-6 max-w-lg mx-auto bg-white shadow-md rounded-md space-y-4"
              >
                <div>
                  <label className="block text-gray-700 font-semibold">
                    Pickup Location Nick Name
                  </label>
                  <input
                    type="text"
                    name="pickup_location"
                    value={formData.pickup_location}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                  />
                  {errors.pickup_location && (
                    <p className="text-red-500 text-sm">
                      {errors.pickup_location}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm">{errors.address}</p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold">
                    Address 2 (Optional)
                  </label>
                  <input
                    type="text"
                    name="address_2"
                    value={formData.address_2}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                  />
                  {errors.city && (
                    <p className="text-red-500 text-sm">{errors.city}</p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold">
                    State
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                  />
                  {errors.state && (
                    <p className="text-red-500 text-sm">{errors.state}</p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold">
                    Country
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                  />
                  {errors.country && (
                    <p className="text-red-500 text-sm">{errors.country}</p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold">
                    Pin Code
                  </label>
                  <input
                    type="text"
                    name="pin_code"
                    value={formData.pin_code}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                  />
                  {errors.pin_code && (
                    <p className="text-red-500 text-sm">{errors.pin_code}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
                >
                  Submit
                </button>
              </form>
            ) : (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {/* <ProfileItem
                  label="Mobile Number"
                  value={sellerData.mobile_number}
                /> */}
                <ProfileItem
                  label="Company Name"
                  value={sellerInfo.company_name}
                />
                <ProfileItem
                  label="Pickup Location Nick Name"
                  value={sellerInfo.pickup_location}
                />
                <ProfileItem
                  label="Pickup Location Id"
                  value={sellerInfo.pickup_id}
                />
                <ProfileItem
                  label="Pickup Location RTO Address Id"
                  value={sellerInfo.rto_address_id}
                />
                <ProfileItem
                  label="Address"
                  value={sellerInfo.sellerPickupLocation[0].address}
                />
                {sellerInfo.sellerPickupLocation[0].address_2 && (
                  <ProfileItem
                    label="Address 2"
                    value={sellerInfo.sellerPickupLocation[0].address_2}
                  />
                )}
                <ProfileItem
                  label="State"
                  value={sellerInfo.sellerPickupLocation[0].state}
                />
                <ProfileItem
                  label="City"
                  value={sellerInfo.sellerPickupLocation[0].city}
                />
                <ProfileItem
                  label="Country"
                  value={sellerInfo.sellerPickupLocation[0].country}
                />
                <ProfileItem
                  label="Pincode"
                  value={sellerInfo.sellerPickupLocation[0].pin_code}
                />
              </div>
            )}
            <hr className="mt-4 mb-4" />

            {/* Date of Birth */}
            {/* <p className="py-2 text-xl font-semibold text-left">Date of Birth</p>
          <div className="flex items-center">
            <div className="flex flex-col space-y-2 w-full">
              <label>
                <span className="text-sm text-gray-500">DOB</span>
                <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                  <input
                    type="text"
                    className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                    value={dob}
                    readOnly={!dobEditable}
                    onChange={(e) => setDob(e.target.value)}
                  />
                </div>
              </label>
              {dobEditable && (
                <button
                  onClick={() => {
                    toggleDobEditable();
                    saveDob();
                  }}
                  className="mt-2 px-4 font-semibold text-white bg-blue-600 py-2 focus:outline-none"
                >
                  Save
                </button>
              )}
            </div>
            {!dobEditable && (
              <button
                onClick={toggleDobEditable}
                className="ml-2 px-4 font-semibold text-white bg-blue-600 py-2 focus:outline-none"
              >
                Edit
              </button>
            )}
          </div>
          {dobSavedNotification && (
            <div className="mt-2 text-green-500">DOB Saved Successfully!</div>
          )}
          <hr className="mt-4 mb-8" /> */}

            {/* Security Questions */}
            {/* <p className="py-2 text-xl font-semibold text-left">
            Security Questions
          </p> */}
            {/* Add input fields for security questions and answers */}
            {/* <hr className="mt-4 mb-8" /> */}

            {/* GST */}
            {/* <p className="py-2 text-xl font-semibold text-left">GST</p>
          <div className="flex items-center">
            <div className="flex flex-col space-y-2">
              <label>
                <span className="text-sm text-gray-500">GST Number</span>
                <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                  <input
                    type="text"
                    className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                    value="GST123456789"
                    readOnly
                  />
                </div>
              </label>
            </div>
          </div>
          <hr className="mt-4 mb-8" /> */}

            {/* Account Details */}
            {/* <p className="py-2 text-xl font-semibold text-left">
            Account Details
          </p> */}
            {/* Add input fields for account details */}

            {/* <div className="mt-4 flex justify-center">
            <button className="rounded-lg bg-blue-600 px-4 py-2 text-white">
              Save Changes
            </button>
          </div>
          <hr className="mt-4 mb-8" /> */}

            {/* Add functionality for deleting account */}
            {/* <div className="mb-10 flex justify-center">
            <p className="py-2 text-xl font-semibold">Delete Account</p>
          </div> */}

            <p className="py-2 text-xl font-semibold text-left">
              Account Status
            </p>
            {!sellerInfo.isApproved &&
              !sellerInfo.isRejected &&
              !sellerInfo.isAppliedForApproval &&
              (sellerInfo.isPickUpLocationAdded ? (
                <button
                  className="rounded-lg bg-blue-600 px-4 py-2 text-white"
                  onClick={handleApplyForApproval}
                >
                  Apply for approval
                </button>
              ) : (
                <button className="rounded-lg bg-slate-600 px-4 py-2 text-white">
                  Apply for approval
                </button>
              ))}

            {!sellerInfo.isApproved &&
              !sellerInfo.isRejected &&
              sellerInfo.isAppliedForApproval && (
                <button className="rounded-lg bg-blue-600 px-4 py-2 text-white">
                  Account activation in progress
                </button>
              )}

            {sellerInfo.isApproved && !sellerInfo.isRejected && (
              <>
                <div>Your account is approved to sell product</div>
                {/* <button
                  variant="outlined"
                  sx={{ textTransform: "none", mt: 2 }}
                  startIcon={<GiSandsOfTime />}
                  // onClick={handleReviewInProgessClick}
                >
                  Review in Progress
                </button> */}

                {/* <Button
                  variant="outlined"
                  sx={{ textTransform: "none", mt: 2 }}
                  startIcon={<TbReport />}
                  onClick={handleMarkForReview}
                >
                  Mark for review
                </Button> */}

                {/* <Button
                  variant="outlined"
                  sx={{ textTransform: "none", mt: 2 }}
                  startIcon={<MdVerified />}
                  onClick={handleApprovedClick}
                >
                  Approved
                </Button> */}
              </>
            )}

            {!sellerInfo.isApproved && sellerInfo.isRejected && (
              <div>Rejected</div>
            )}
          </div>
        </div>
      ) : (
        "Not found"
      )}
    </div>
  );
};

export default SellerAccount;
