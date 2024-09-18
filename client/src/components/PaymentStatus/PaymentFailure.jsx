import React from "react";
import { Link } from "react-router-dom";

const PaymentFailure = () => {
  return (
    <div className="my-8 flex justify-center ">
      <div className="rounded-lg bg-white p-6 shadow-lg flex flex-col items-center ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          className="mb-4 h-8 w-8 text-red-500"
          fill="currentColor"
        >
          <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z" />
        </svg>

        <h1 className="mb-2 text-2xl font-bold">
          Transaction was unsucessfully!
        </h1>
        <Link to="/checkout" className="my-6 text-gray-900 flex items-center justify-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="h-4 w-4 text-red-500"
          >
            <path d="M177.5 414c-8.8 3.8-19 2-26-4.6l-144-136C2.7 268.9 0 262.6 0 256s2.7-12.9 7.5-17.4l144-136c7-6.6 17.2-8.4 26-4.6s14.5 12.5 14.5 22l0 72 288 0c17.7 0 32 14.3 32 32l0 64c0 17.7-14.3 32-32 32l-288 0 0 72c0 9.6-5.7 18.2-14.5 22z" />
          </svg>
          <p>Back to Checkout</p>
        </Link>
      </div>
    </div>
  );
};

export default PaymentFailure;
