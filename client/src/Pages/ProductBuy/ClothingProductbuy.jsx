/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import UserAxiosInstance from "../../UserAxiosInstance";
import { toast } from "react-toastify";

function ClothingProductbuy({ selectedCourier, deliveryAddress }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [productDetail, setProductDetail] = useState();
  const [variantDetail, setVariantDetail] = useState();
  const [sizeVariantDetail, setSizeVariantDetail] = useState();
  const [sizeVariantInventoryDetail, setSizeVariantInventoryDetail] =
    useState();
  const [offeredPrice, setOfferedPrice] = useState();
  const [deliveryCharge, setDeliveryCharge] = useState();
  const [totalAmont, setTotalAmount] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (sizeVariantDetail) {
      setOfferedPrice(sizeVariantDetail.offered_price);
    }
  }, [sizeVariantDetail]);

  useEffect(() => {
    // let charge = Math.ceil(selectedCourier.freight_charge)
    // setDeliveryCharge(charge);
    setDeliveryCharge(selectedCourier.freight_charge);
  }, [selectedCourier.freight_charge]);

  const getClothingProductDetails = async () => {
    try {
      const productId = searchParams.get("productId");
      const variantId = searchParams.get("variantId");
      const sizeVariantId = searchParams.get("sizeVariantId");

      if (!productId || !variantId || !sizeVariantId) {
        throw new Error("Some error occurred");
      }

      const url = `/product/get-clothing-order-detail?productId=${productId}&variantId=${variantId}&sizeVariantId=${sizeVariantId}`;
      const response = await UserAxiosInstance.get(url);

      if (response.status === 200) {
        // console.log(response.data);
        setProductDetail(response.data.productDetail);
        setVariantDetail(response.data.variantDetail);
        setSizeVariantDetail(response.data.sizeVariantDetail);
        setSizeVariantInventoryDetail(
          response.data.setSizeVariantInventoryDetail
        );
      }
    } catch (error) {
      toast.error("Some error occurred");
      console.log("Error while fetching details");
    }
  };

  useEffect(() => {
    getClothingProductDetails();
  }, []);

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

  const calculateDiscount = (actualPrice, offeredPrice) => {
    let discount;
    discount = Math.round(((actualPrice - offeredPrice) / actualPrice) * 100);
    return discount;
  };

  useEffect(() => {
    if (deliveryCharge && sizeVariantDetail) {
      setTotalAmount(deliveryCharge + sizeVariantDetail?.offered_price);
    }
  }, [deliveryCharge, sizeVariantDetail?.offered_price]);

  const placeOrder = async () => {
    try {
      const productId = searchParams.get("productId");
      const variantId = searchParams.get("variantId");
      const sizeVariantId = searchParams.get("sizeVariantId");
      const quantity = searchParams.get("quantity");
      const is_cod = 0;

      const data = {
        productId,
        variantId,
        sizeVariantId,
        selectedCourier,
        deliveryCharge,
        offeredPrice,
        totalAmont,
        deliveryAddress,
        quantity,
        is_cod: is_cod,
      };

      try {
        // console.log(data);
        const url = "/order/place-order/clothing";
        const response = await UserAxiosInstance.post(url, data);

        if (response.status === 201) {
          // console.log(response.data);
          const savedOrder = response.data.savedOrder;
          if (is_cod === 0) {
            // prepaid - accept payment
            // after payment success - update order status
            // if payment failed then add item stock again to inventry
            const confirmPayment = confirm("Payment confirm?");
            if (confirmPayment) {
              try {
                // console.log("payment confirmed!");
                // console.log(savedOrder);

                const confirmPaymentResponse = await UserAxiosInstance.post(
                  "/order/place-order/clothing/payment-success",
                  { orderDetail: savedOrder, selectedCourier }
                );

                if (confirmPaymentResponse.status === 200) {
                  navigate("/user/orders")
                }
              } catch (error) {
                console.log("Error while payment success");
              }
            } else {
              // handle payment failed
              try {
                console.log("Payment not confirmed!");
                console.log(savedOrder);
              } catch (error) {
                console.log("Error while payment failed");
              }
            }
          } else {
            // cash on delivery
            // show order placed
          }
        }
      } catch (error) {
        console.log("Error while creating order");
      }
    } catch (error) {
      console.log("Error while placing order");
    }
  };

  // console.log(offeredPrice);
  // console.log(deliveryCharge);
  // console.log(totalAmont);

  return (
    <div>
      {productDetail && (
        <div className="flex gap-3 pb-2">
          {/* product image */}
          <div className="w-1/3"></div>

          {/* detail */}
          <div>
            {/* Title */}
            <div className="text-xl font-semibold">{getTitle()}</div>
            <div className="text-bold">Size: {sizeVariantDetail.size}</div>

            <p className="inline-block font-semibold text-red-800  ">
              <span className="font-normal text-gray-500 line-through ">
                Rs {sizeVariantDetail.actual_price}
              </span>{" "}
              <span className="text-xl">
                Rs {sizeVariantDetail.offered_price}
              </span>{" "}
              <span className="text-base">
                (
                {calculateDiscount(
                  sizeVariantDetail.actual_price,
                  sizeVariantDetail.offered_price
                )}
                % OFF)
              </span>
            </p>
          </div>
        </div>
      )}
      <hr />

      {productDetail && deliveryCharge && (
        <>
          <div className="flex justify-end pt-2">
            <div className="w-1/3">
              <div className="flex justify-between">
                <div>Price (1 item)</div>
                <div>₹ {offeredPrice}</div>
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

export default ClothingProductbuy;
