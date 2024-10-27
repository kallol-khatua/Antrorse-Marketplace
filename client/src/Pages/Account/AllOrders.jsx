/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import OrderSkeleton from "../../components/UserOrder/OrderSkeleton";
import UserAxiosInstance from "../../UserAxiosInstance";

const NoOrder = () => {
  return (
    <div className="mt-5 flex flex-col items-center">
      <h1 className="text-xl font-semibold ">No orders found</h1>
    </div>
  );
};

const OrderDetail = ({ orderItem }) => {
  // console.log(orderItem);

  const getFormattedDate = (utcDateStr) => {
    // console.log(utcDateStr);
    const utcDate = new Date(utcDateStr);

    // Convert to IST by setting the locale and options
    const options = {
      day: "numeric",
      month: "short",
      year: "numeric",
      timeZone: "Asia/Kolkata",
    };
    const istDate = utcDate.toLocaleDateString("en-GB", options);

    return istDate;
  };

  return (
    <div className="border border-1 bg-white p-2 rounded-lg cursor-pointer">
      <div className="flex justify-between">
        <div>Order ID: {orderItem.orderItems.short_order_id}</div>
        {!orderItem.is_order_placed && <div>Order not placed</div>}
        {orderItem.is_order_placed && (
          <div>Order date: {getFormattedDate(orderItem.orderPlacedAt)} </div>
        )}
      </div>
    </div>
  );
};

function AllOrders() {
  const [orderItems, setOrderItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadOrder = async () => {
    try {
      setIsLoading(false);
      const response = await UserAxiosInstance.get("/user/get-all-orders");

      if (response.status === 200) {
        // console.log(response.data);
        setOrderItems(response.data.orderItems);
      }
    } catch (error) {
      console.log("Error while fetching orders");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadOrder();
  }, []);

  return (
    <div className="bg-neutral-100 h-full p-3 rounded-lg">
      <div className="text-xl font-semibold">All orders</div>
      <hr />

      <div className="mt-3">
        {isLoading ? (
          <OrderSkeleton />
        ) : orderItems.length > 0 ? (
          <div className="flex flex-col gap-2">
            {orderItems.map((orderItem, index) => {
              return <OrderDetail orderItem={orderItem} key={index} />;
            })}
          </div>
        ) : (
          <NoOrder />
        )}
      </div>
    </div>
  );
}

export default AllOrders;
