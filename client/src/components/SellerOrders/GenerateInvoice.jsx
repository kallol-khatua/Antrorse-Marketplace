/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axiosInstanceSeller from "../../axiosInstanceSeller";
import { toast } from "react-toastify";

const NoOrder = () => {
  return <div className="text-xl font-semibold p-2">No orders found</div>;
};

const OrderDetail = ({ orderItem }) => {
  // console.log(orderItem);
  const handleGenerateAWB = async () => {
    try {
      const url = `${
        import.meta.env.VITE_BACKEND_URL
      }/seller/get-all-orders/generate-awb`;
      const response = await axiosInstanceSeller.post(url, {
        orderItemId: orderItem._id,
      });
      if (response.status === 200) {
        console.log(response.data);
        toast.success("AWB Generated");
      }
    } catch (error) {
      console.log("Error while generating AWB");
    }
  };

  return (
    <div className="bg-white rounded-lg border border-1 p-2">
      <div>
        <div>Order id: {orderItem.short_order_id}</div>
      </div>
      <div className="flex justify-end">
        <button
          className="border border-2 rounded-lg px-5 py-2"
          onClick={handleGenerateAWB}
        >
          Generate AWB
        </button>
      </div>
    </div>
  );
};

function GenerateInvoice() {
  const [orderItems, setOrderItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadOrder = async () => {
    try {
      setIsLoading(false);
      const response = await axiosInstanceSeller.get(
        "/seller/get-all-orders/generate-invoice"
      );

      if (response.status === 200) {
        // console.log(response.data.orderItems);
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

  // console.log(orderItems);

  return (
    <div>
      {isLoading ? (
        "Loading..."
      ) : orderItems.length > 0 ? (
        <div className="p-3 rounded-lg flex gap-2 flex-col border border-1">
          {orderItems.map((orderItem, index) => {
            return <OrderDetail orderItem={orderItem} key={index} />;
          })}
        </div>
      ) : (
        <NoOrder />
      )}
    </div>
  );
}

export default GenerateInvoice;
