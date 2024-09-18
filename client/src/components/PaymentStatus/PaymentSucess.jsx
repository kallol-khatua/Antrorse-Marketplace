import React from "react";

const PaymentSucess = ({ tranasctionDetails }) => {
  const { transactionId } = tranasctionDetails.data;

  return (
    <div className="my-8 flex justify-center ">
      <div className="rounded-lg bg-white p-6 shadow-lg flex flex-col items-center ">
        <svg
          className="mb-4 h-8 w-8 text-green-500"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          ></path>
        </svg>
        <h1 className="mb-2 text-2xl font-bold">We received your order!</h1>
        <p className="mb-6 text-gray-600">
          Your order <span className="font-bold text-md"> {`${transactionId}`} </span> is completed and ready
          to ship
        </p>
      </div>
    </div>
  );
};

export default PaymentSucess;
