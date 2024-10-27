/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import UserAxiosInstance from "../../UserAxiosInstance";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";
import ClothingProductbuy from "./ClothingProductbuy";
import DefaultProductBuy from "./DefaultProductBuy";
import FoodsAndBeveragesBuy from "./FoodsAndBeveragesBuy";
import axios from "axios";

function AddNewAddress({ isOpen, onClose, loadAddress, newAddressAfterAdd }) {
  const [formData, setFormData] = useState({
    name: "",
    last_name: "",
    phone_number: "",
    email: "",
    address: "",
    address_2: "",
    pincode: "",
    state: "",
    city: "",
    country: "",
    landmark: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleAddressSubmit = async (e) => {
    e.preventDefault();

    // console.log(formData);

    try {
      setIsSubmitting(true);
      const response = await UserAxiosInstance.post(
        "/user/create-address",
        formData
      );
      if (response?.status === 201) {
        setIsSubmitting(false);
        setFormData({
          name: "",
          last_name: "",
          phone_number: "",
          pincode: "",
          email: "",
          state: "",
          city: "",
          address: "",
          address_2: "",
          country: "",
          landmark: "",
        });
        newAddressAfterAdd(response.data.savedAddress);
        loadAddress();
        onClose();
      }
    } catch (error) {
      if (error?.response?.status === 401) {
        toast.error(error?.response?.data?.message);
      }
    }
  };

  const handleClose = () => {
    setIsSubmitting(false);
    setFormData({
      name: "",
      phone_number: "",
      pincode: "",
      state: "",
      city: "",
      house: "",
      area: "",
      landmark: "",
    });
    onClose();
  };

  return (
    <div className="min-h-screen pt-20 md:pt-0 overflow-y-scroll inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white mb-5 rounded-lg p-6 min-w-80 md:w-1/3 sm:min-w-96">
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="text-xl font-semibold">Add new address</h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>
        </div>
        <div className="mt-4">
          <form className="max-w-md mx-auto" onSubmit={handleAddressSubmit}>
            {/* First name */}
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, [e.target.name]: e.target.value })
                }
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                required
                placeholder="First name *"
                autoFocus
              />
            </div>

            {/* Last name */}
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="last_name"
                id="last_name"
                value={formData.last_name}
                onChange={(e) =>
                  setFormData({ ...formData, [e.target.name]: e.target.value })
                }
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                required
                placeholder="Last name *"
                autoFocus
              />
            </div>

            {/* phone_number */}
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="number"
                name="phone_number"
                id="phone_number"
                value={formData.phone_number}
                onChange={(e) =>
                  setFormData({ ...formData, [e.target.name]: e.target.value })
                }
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder="Phone number *"
                required
              />
            </div>

            {/* email */}
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, [e.target.name]: e.target.value })
                }
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder="Email *"
                required
              />
            </div>

            {/* address 1 */}
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="address"
                id="address"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, [e.target.name]: e.target.value })
                }
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder="Address - 1 *"
                required
              />
            </div>

            {/* address 2 */}
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="address_2"
                id="address_2"
                value={formData.address_2}
                onChange={(e) =>
                  setFormData({ ...formData, [e.target.name]: e.target.value })
                }
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder="Address - 2"
              />
            </div>

            {/* pincode */}
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="number"
                name="pincode"
                id="pincode"
                value={formData.pincode}
                onChange={(e) =>
                  setFormData({ ...formData, [e.target.name]: e.target.value })
                }
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder="Pincode *"
                required
              />
            </div>

            {/* state */}
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="state"
                id="state"
                value={formData.state}
                onChange={(e) =>
                  setFormData({ ...formData, [e.target.name]: e.target.value })
                }
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                required
                placeholder="State *"
              />
            </div>

            {/* city */}
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="city"
                id="city"
                value={formData.city}
                onChange={(e) =>
                  setFormData({ ...formData, [e.target.name]: e.target.value })
                }
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                required
                placeholder="City *"
              />
            </div>

            {/* country */}
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="country"
                id="country"
                value={formData.country}
                onChange={(e) =>
                  setFormData({ ...formData, [e.target.name]: e.target.value })
                }
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                required
                placeholder="country *"
              />
            </div>

            {/* landmark */}
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="landmark"
                id="landmark"
                value={formData.landmark}
                onChange={(e) =>
                  setFormData({ ...formData, [e.target.name]: e.target.value })
                }
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder="Landmark"
              />
            </div>
            <button
              type="submit"
              className="text-white w full bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center"
            >
              {isSubmitting ? "Submitting" : "Submit"}
            </button>
          </form>
        </div>
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleClose}
            className="w-full border border-red-400 text-black px-4 py-2 rounded-lg hover:text-white hover:bg-red-600"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

function AddressDetail({ address, handleAddressesChange, deliveryAddress }) {
  // console.log(address);
  return (
    <div className="border border-gray px-3 py-3 flex items-center">
      <div className="pr-2 ">
        <input
          name="address"
          type="radio"
          checked={deliveryAddress?._id === address._id}
          onChange={() => handleAddressesChange(address)}
          className="cursor-pointer"
        />
      </div>
      <div>
        <div className="flex justify-between">
          <div>
            {address.name}, {address.last_name}
          </div>
        </div>
        <div>
          {address.address}, {address.landmark && address.landmark + ","}{" "}
          {address.city}, {address.pincode}, {address.state}, {address.country}
        </div>
        <div>
          {address.email}, {address.phone_number}
        </div>
      </div>
    </div>
  );
}

const CourierServiceDetails = ({ courier, handleCourierChange, isCOD }) => {
  //   console.log(courier);
  return (
    <div className="border border-gray px-3 py-3 flex items-center">
      <div className="pr-2 ">
        <input
          name="address"
          type="radio"
          //   checked={deliveryAddress?._id === address._id}
          onChange={() => handleCourierChange(courier)}
          className="cursor-pointer"
        />
      </div>
      <div>
        <div>Courier name: {courier.courier_name}</div>
        <div>
          Estimated Delivery: {courier.estimated_delivery_days} Days (
          {courier.etd})
        </div>
        <div>
          Delivery Charge: ₹
          {isCOD === 0
            ? courier.freight_charge
            : courier.freight_charge + courier.cod_charges}
        </div>
        <div>Courier Rating: {courier.rating}/5</div>
        <div>Delivery Mode: {courier.is_surface ? "Surface" : "Air"}</div>
      </div>
    </div>
  );
};

function ProductBuy() {
  const [isAddressChoosen, setIsAddressChoosen] = useState(false);
  const [addNewAddress, setAddNewAddress] = useState(false);
  const closeAddNewAddress = () => setAddNewAddress(false);
  const handleAddNewAddress = () => setAddNewAddress(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const [isAddressLoaded, setIsAddressLoaded] = useState(false);
  const [addresses, setAddresses] = useState([]);

  const [deliveryAddress, setDeliveryAddress] = useState(null);
  const [addedAddress, setAddedAddress] = useState();

  const [productCategory, setProductCategory] = useState("");
  const [sellerPinCode, setSellerPinCode] = useState();
  const [isCourierChoosen, setIsCourierChoosen] = useState(false);

  //   Choose courier
  const [shipRocketAuthToken, setShipRocketAuthToken] = useState();
  const [couriers, setCouriers] = useState([]);
  const [isCourierDetailsLoaded, setIsCourierDetailsLoaded] = useState(false);
  const [selectedCourier, setSelectedCourier] = useState(null);

  const [isCOD, setIsCOD] = useState(1);
  const [isPaymentMethodChoosen, setIsPaymentMethodChoosen] = useState(false);

  const loadAddress = async () => {
    try {
      const response = await UserAxiosInstance.get("/user/getAddress");
      if (response.status === 200) {
        setTimeout(() => {
          setAddresses(response.data.addresses);
          setIsAddressLoaded(true);
        }, [250]);
      }
    } catch (error) {
      console.log("error while loading addresses");
      setIsAddressLoaded(true);
    }
  };

  const newAddressAfterAdd = (savedAddress) => {
    setAddedAddress(savedAddress);
    setDeliveryAddress(savedAddress)
    // setIsAddressChoosen(true);
  };

  //   useEffect(() => {
  //     setDeliveryAddress(addedAddress?._id);
  //   }, [addedAddress?._id, setAddedAddress]);

  useEffect(() => {
    loadAddress();
  }, []);

  const handleAddressesChange = (deliveryAddress) => {
    setDeliveryAddress(deliveryAddress);

    setIsCourierDetailsLoaded(false);
  };

  // Getting product category, so that we can show product order preview acoording to category
  useEffect(() => {
    const getProductCategory = async () => {
      try {
        const productId = searchParams.get("productId");
        const url = `/product/get-product-category?productId=${productId}`;

        const response = await UserAxiosInstance.get(url);
        if (response.status === 200) {
          setProductCategory(response.data.productDetail.product_type);
        }
      } catch (error) {
        console.log(error);
        console.log("error while fetching product details");
      }
    };

    getProductCategory();
  }, [searchParams]);

  //   console.log(productCategory)

  const handleIsAddressChoosen = () => {
    if (deliveryAddress) {
      setIsAddressChoosen((prev) => !prev);
      // setCouriers([]);
      setIsCourierChoosen(false);
      setSelectedCourier(null);
    } else {
      toast.error("Please select delivery address");
    }
  };

  // Getting seller address to check courier service avalibility
  useEffect(() => {
    const getSellerAddress = async () => {
      try {
        const productId = searchParams.get("productId");
        const url = `${
          import.meta.env.VITE_BACKEND_URL
        }/product/get-seller-detail?productId=${productId}`;
        const response = await axios.get(url);
        //   console.log(response.data);

        if (response.data.sellerDetails) {
          setSellerPinCode(response.data.sellerDetails.pin_code);
        }

        if (response.data.adminDetails) {
          setSellerPinCode(response.data.adminDetails.pin_code);
        }
      } catch (error) {
        console.log("Error while fetching seller details");
      }
    };
    getSellerAddress();
  }, [searchParams]);

  // Function to generate shiprocket auth token
  const generateShipRocetAuthToken = async () => {
    try {
      const response = await axios.post(
        "https://apiv2.shiprocket.in/v1/external/auth/login",
        {
          email: import.meta.env.VITE_SHIPROCKET_EMAIL,
          password: import.meta.env.VITE_SHIPROCKET_PASSWORD,
        }
      );

      if (response.status === 200) {
        // console.log(response.data);
        setShipRocketAuthToken(response.data.token);
      }
    } catch (error) {
      console.log("Error while fetching shiprocet auth token");
    }
  };

  // Caling generate auth token function
  useEffect(() => {
    generateShipRocetAuthToken();
  }, []);

  // Getting courier service from which user will choose the best one suitable for them
  useEffect(() => {
    const getDeliveryChagreFromCourierService = async () => {
      const delivery_postcode = deliveryAddress.pincode;
      const pickup_postcode = sellerPinCode;
      const weight = 0.2; // in kg
      const cod = isCOD;

      // console.log(sellerPinCode);
      // console.log(deliveryAddress.pincode)

      try {
        const url = `https://apiv2.shiprocket.in/v1/external/courier/serviceability/?pickup_postcode=${pickup_postcode}&delivery_postcode=${delivery_postcode}&cod=${cod}&weight=${weight}`;
        // 0 for Prepaid, 1 for COD

        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${shipRocketAuthToken}`, // Adding the Authorization token
            "Content-Type": "application/json", // Optional, based on API requirements
          },
        });

        if (response.status === 200) {
          // console.log(response.data.data);
          // console.log(response.data.data.available_courier_companies);
          setCouriers(response.data.data.available_courier_companies);
          setIsCourierDetailsLoaded(true);
        }
      } catch (error) {
        setIsCourierDetailsLoaded(true);
        console.log("Error while fetching delivery charge details");
      }
    };

    if (shipRocketAuthToken && sellerPinCode && deliveryAddress) {
      getDeliveryChagreFromCourierService();
    }
  }, [sellerPinCode, shipRocketAuthToken, deliveryAddress, isCOD]);

  const handleCourierChange = (courier) => {
    setSelectedCourier(courier);
  };

  const handleConfirmCourierService = () => {
    if (selectedCourier) {
      setIsCourierChoosen(true);
    } else {
      toast.error("Please courier service");
    }
  };

  // Function to set payment method choosen by user
  const handleConfirmPaymentMethod = () => {
    setIsPaymentMethodChoosen(true);
  };

  // while user click on the payment method
  const hanPaymentMethodSelect = () => {
    setIsPaymentMethodChoosen((prev) => !prev);
    setIsAddressChoosen(false);
    setIsCourierChoosen(false);
    setSelectedCourier(null);
  };

  const handleConfirmAddressChoose = () => {
    if (deliveryAddress) {
      setIsAddressChoosen(true);
      setIsCourierChoosen(false);
      setSelectedCourier(null);
    } else {
      toast.error("Please select delivery address");
    }
  };

  // console.log(isCOD);

  return (
    <div className="px-20 mx-10 mx-auto mt-10 space-y-4 my-10">
      {/** payment method */}
      <div className="border rounded-md">
        <button
          className="w-full text-left p-4 bg-gray-200 hover:bg-gray-300 font-semibold"
          onClick={hanPaymentMethodSelect}
        >
          Payment method
        </button>
        {!isPaymentMethodChoosen && (
          <div className="p-4 bg-white border-t">
            <div className="mb-5">
              <div className="space-y-4">
                <h2 className="text-lg font-semibold mb-4">
                  Choose Payment Method
                </h2>

                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value={0}
                    checked={isCOD === 0}
                    onChange={() => setIsCOD(0)}
                    className="form-radio text-blue-500 focus:ring-blue-500"
                  />
                  <span className="text-gray-700">Prepaid</span>
                </label>

                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value={1}
                    checked={isCOD === 1}
                    onChange={() => setIsCOD(1)}
                    className="form-radio text-blue-500 focus:ring-blue-500"
                  />
                  <span className="text-gray-700">Cash on Delivery</span>
                </label>

                <div className="mt-4">
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded-md"
                    onClick={handleConfirmPaymentMethod}
                  >
                    Confirm Payment Method
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/** Address */}
      <div className="border rounded-md">
        <button
          className="w-full text-left p-4 bg-gray-200 hover:bg-gray-300 font-semibold"
          onClick={handleIsAddressChoosen}
        >
          Delivery Address
        </button>
        {!isAddressChoosen && isPaymentMethodChoosen && (
          <div className="p-4 bg-white border-t">
            <div className="flex justify-end mb-5">
              <button
                type="button"
                className="rounded-lg border border-primary-200 px-3 py-2 text-center text-sm font-medium text-gray-900 hover:bg-primary-50"
                onClick={handleAddNewAddress}
              >
                Add a new address
              </button>
            </div>
            {!isAddressLoaded ? (
              <p>Addresses are loading..</p>
            ) : (
              <div>
                {addresses.length > 0 ? (
                  addresses.map((address, idx) => {
                    return (
                      <AddressDetail
                        key={idx}
                        address={address}
                        handleAddressesChange={handleAddressesChange}
                        deliveryAddress={deliveryAddress}
                      />
                    );
                  })
                ) : (
                  <p>No address found. Please add one delivery address</p>
                )}
              </div>
            )}
            <div className="mt-4">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
                onClick={handleConfirmAddressChoose}
              >
                Confirm address
              </button>
            </div>
          </div>
        )}
      </div>

      <AddNewAddress
        isOpen={addNewAddress}
        onClose={closeAddNewAddress}
        loadAddress={loadAddress}
        newAddressAfterAdd={newAddressAfterAdd}
      />

      {/* Choose courier */}
      <div className="border rounded-md">
        <button className="w-full text-left p-4 bg-gray-200 hover:bg-gray-300 font-semibold">
          Choose courier
        </button>
        {isAddressChoosen &&
          deliveryAddress &&
          !isCourierChoosen &&
          isPaymentMethodChoosen && (
            <div className="p-4 bg-white border-t">
              {!isCourierDetailsLoaded ? (
                <p>Courier details are loading..</p>
              ) : (
                <div>
                  {couriers.length > 0 ? (
                    <div>
                      {couriers.map((courierService, index) => {
                        return (
                          <CourierServiceDetails
                            isCOD={isCOD}
                            key={index}
                            courier={courierService}
                            handleCourierChange={handleCourierChange}
                          />
                        );
                      })}
                      <div className="mt-4">
                        <button
                          className="px-4 py-2 bg-blue-500 text-white rounded-md"
                          onClick={handleConfirmCourierService}
                        >
                          Confirm this courier
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p>
                      No courier service found for the address. Please choose
                      different delivery address
                    </p>
                  )}
                </div>
              )}
            </div>
          )}
      </div>

      {/** Order details preview */}
      <div className="border rounded-md">
        <button className="w-full text-left p-4 bg-gray-200 hover:bg-gray-300 font-semibold">
          Preview order details
        </button>
        {isAddressChoosen && deliveryAddress && isCourierChoosen && (
          <div className="p-4 bg-white border-t">
            {productCategory === "Clothings" && (
              <ClothingProductbuy
                selectedCourier={selectedCourier}
                deliveryAddress={deliveryAddress}
              />
            )}
            {productCategory === "Default" && (
              <DefaultProductBuy
                selectedCourier={selectedCourier}
                deliveryAddress={deliveryAddress}
                isCOD={isCOD}
              />
            )}
            {productCategory === "Foods & Beverages" && (
              <FoodsAndBeveragesBuy
                selectedCourier={selectedCourier}
                deliveryAddress={deliveryAddress}
                isCOD={isCOD}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductBuy;
