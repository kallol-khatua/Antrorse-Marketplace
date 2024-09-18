import axios from "axios";
import React, { useEffect, useState } from "react";
import { Grid } from "react-loader-spinner";
import { useParams } from "react-router-dom";
import PaymentSucess from "../PaymentStatus/PaymentSucess";
import PaymentFailure from "../PaymentStatus/PaymentFailure";

const PhonepeStatus = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [tranasctionDetails, setTransactionDetails] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  const params = useParams();
  const transactionId = params.transactionID;

  const handleShipping = () => {};

  const fetchCartData = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/app/cart/getCartData`,
      {
        headers: {
          token: localStorage.getItem("authToken"),
        },
      }
    );

    setCartItems(() => response.data.result);

    console.log(cartItems)
  };

  const checkTransactionStatus = async () => {
    const transactionData = {
      transactionId: transactionId,
    };

    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/payment/validate/${transactionId}`,
        transactionData
      );

      if (response.data.success === true) {
        setIsLoading(false);
        setTransactionDetails(response.data);
        setPaymentStatus(response.data.success);
        fetchCartData();
      } else {
        setPaymentStatus(response.data.success);
      }

      console.log(response);
    } catch (error) {
      console.error(`ERROR OCCURED IN TRANSACATION: ${error.message}`);
    }
  };

  useEffect(() => {
    checkTransactionStatus();
    console.log("here");
  }, []);

  return (
    <div>
      {isLoading ? (
        <div className=" w-full bg-red-300 items-center justify-center">
          <Grid
            visible={true}
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="grid-loading"
            radius="12.5"
            wrapperStyle={{}}
            wrapperClass="grid-wrapper"
          />
        </div>
      ) : paymentStatus ? (
        <PaymentSucess tranasctionDetails={tranasctionDetails} />
      ) : (
        <PaymentFailure />
      )}
    </div>
  );
};

export default PhonepeStatus;
