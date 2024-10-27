/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import UserAxiosInstance from "../../UserAxiosInstance";
import { toast } from "react-toastify";

function FoodsAndBeveragesBuy({ deliveryAddress, selectedCourier, isCOD }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [productDetail, setProductDetail] = useState();
  const [variantDetail, setVariantDetail] = useState();
  const [variantInventoryDetail, setVariantInventoryDetail] = useState();

  const [quantity, setQuantity] = useState();

  const [offeredPrice, setOfferedPrice] = useState();
  const [subtotalPrice, setSubtotalPrice] = useState();
  const [deliveryCharge, setDeliveryCharge] = useState();
  const [totalAmont, setTotalAmount] = useState();
  const navigate = useNavigate();

  // Get delivery charge from the selected courier service
  useEffect(() => {
    if (isCOD === 0) {
      setDeliveryCharge(selectedCourier.freight_charge);
    } else {
      setDeliveryCharge(
        selectedCourier.freight_charge + selectedCourier.cod_charges
      );
    }
  }, [isCOD, selectedCourier.cod_charges, selectedCourier.freight_charge]);

  // To get product, variant and variantInventory information
  useEffect(() => {
    const getClothingProductDetails = async () => {
      try {
        const productId = searchParams.get("productId");
        const variantId = searchParams.get("variantId");

        if (!productId || !variantId) {
          throw new Error("Some error occurred");
        }

        const url = `/product/get-default-order-detail?productId=${productId}&variantId=${variantId}`;
        const response = await UserAxiosInstance.get(url);

        if (response.status === 200) {
          // console.log(response.data);
          setProductDetail(response.data.productDetail);
          setVariantDetail(response.data.variantDetail);
          setVariantInventoryDetail(response.data.variantInventoryDetail);
        }
      } catch (error) {
        toast.error("Some error occurred");
        console.log("Error while fetching details");
      }
    };

    getClothingProductDetails();
  }, [searchParams]);

  const getTitle = () => {
    let title = "";

    if (productDetail.brand_name) {
      title += productDetail.brand_name + " ";
    }

    if (productDetail.ideal_for) {
      title += productDetail.ideal_for + " ";
    }

    if (productDetail.fit) {
      title += productDetail.fit + " ";
    }

    if (productDetail.fabric) {
      title += productDetail.fabric + " ";
    }

    if (productDetail.generic_name) {
      title += productDetail.generic_name;
    }

    return title;
  };

  // To calculate discount
  const calculateDiscount = (actualPrice, offeredPrice) => {
    let discount;
    discount = Math.round(((actualPrice - offeredPrice) / actualPrice) * 100);
    return discount;
  };

  // To get offeredPrice from the variantdetail
  useEffect(() => {
    if (variantDetail) {
      setOfferedPrice(variantDetail.offered_price);
    }
  }, [variantDetail]);

  // To calculate total amount by addding delivery charge and offered price
  useEffect(() => {
    if (deliveryCharge && subtotalPrice) {
      setTotalAmount(deliveryCharge + subtotalPrice);
    }
  }, [deliveryCharge, subtotalPrice]);

  // To get number of quantity
  useEffect(() => {
    const quantity = searchParams.get("quantity");

    if (quantity) {
      setQuantity(quantity);
    }
  }, [searchParams]);

  // To calculate sub total price
  useEffect(() => {
    if (offeredPrice && quantity) {
      setSubtotalPrice(offeredPrice * quantity);
    }
  }, [offeredPrice, quantity]);

  const handleCODOrder = async () => {
    try {
      const productId = searchParams.get("productId");
      const variantId = searchParams.get("variantId");
      const quantity = searchParams.get("quantity");
      const is_cod = isCOD;

      const data = {
        productId,
        variantId,
        quantity,
        is_cod,

        selectedCourier,
        deliveryAddress,

        offeredPrice,
        subtotalPrice,
        deliveryCharge,
        totalAmont,
      };

      // console.log(data);

      try {
        const url = "/order/place-order/default/cod";
        const response = await UserAxiosInstance.post(url, data);

        if (response.status === 201) {
          toast.success("Order placed");
          // console.log(response.data);
          navigate("/user/orders");
        }
      } catch (error) {
        console.log("Error while creating order");
        toast.error("Error while placing order");
      }
    } catch (error) {
      console.log("Error while placing order");
      toast.error("Error while placing order");
    }
  };

  // To handel placing order
  const placeOrder = async () => {
    if (isCOD === 0) {
      toast.error("Please select Cash on delivery");
    } else {
      handleCODOrder();
    }
  };

  // console.log(offeredPrice);
  // console.log(deliveryCharge);
  // console.log(totalAmont);

  // console.log(deliveryAddress);
  // console.log(selectedCourier);
  // console.log(isCOD);

  return (
    <div>
      {productDetail && (
        <div className="flex gap-3 pb-2">
          {/* product image */}
          <div className="w-1/3"></div>

          {/* detail */}
          <div>
            {/* Title */}
            <div className="text-xl font-semibold">
              {productDetail?.product_name}
            </div>

            <p className="inline-block font-semibold text-red-800 mt-2 ">
              <span className="text-xl">Rs {variantDetail.offered_price}</span>{" "}
              {variantDetail.offered_price != variantDetail.actual_price && (
                <>
                  <span className="font-normal text-gray-500 line-through ">
                    Rs {variantDetail.actual_price}
                  </span>{" "}
                  <span className="text-base">
                    (
                    {calculateDiscount(
                      variantDetail.actual_price,
                      variantDetail.offered_price
                    )}
                    % OFF)
                  </span>
                </>
              )}
            </p>
          </div>
        </div>
      )}
      <hr />

      {productDetail &&
        deliveryCharge &&
        variantDetail &&
        subtotalPrice &&
        offeredPrice &&
        totalAmont && (
          <>
            <div className="flex justify-end pt-2">
              <div className="w-1/3">
                <div className="flex justify-between">
                  <div>
                    Price (
                    {quantity == 1 ? `${quantity} item` : `${quantity} items`})
                  </div>
                  <div>₹ {subtotalPrice}</div>
                </div>
                <div className="flex justify-between mb-2">
                  <div>Delivery Charges</div>
                  <div>₹ {deliveryCharge}</div>
                </div>
                <hr />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <div className="w-1/3">
                <div className="flex justify-between mb-2 text-xl font-semibold">
                  <div>Total amount</div>
                  <div>₹ {totalAmont}</div>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-5">
              <button
                className="bg-orange-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded"
                onClick={placeOrder}
              >
                Confirm and pay
              </button>
            </div>
          </>
        )}
    </div>
  );
}

export default FoodsAndBeveragesBuy;
