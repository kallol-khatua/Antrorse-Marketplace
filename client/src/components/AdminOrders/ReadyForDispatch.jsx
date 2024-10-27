import { useEffect, useState } from "react";
import axiosInstanceSeller from "../../axiosInstanceSeller";

const NoOrder = () => {
  return <div className="text-xl font-semibold p-2">No orders found</div>;
};

function ReadyForDispatch() {
  const [orderItems, setOrderItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadOrder = async () => {
    try {
      setIsLoading(false);
      const response = await axiosInstanceSeller.get(
        "/admin/get-all-orders/generate-invoice"
      );

      if (response.status === 200) {
        // console.log(response.data.orderItems);
        // setOrderItems(response.data.orderItems);
      }
    } catch (error) {
      console.log("Error while fetching orders");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadOrder();
  }, []);

  console.log(orderItems);

  return (
    <div>
      {isLoading ? "Loading..." : orderItems.length > 0 ? "Order" : <NoOrder />}
    </div>
  );
}

export default ReadyForDispatch;
