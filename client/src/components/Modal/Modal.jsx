import React, { useState } from "react";

const Modal = ({ heading, onCancel, onClose, placeholderText, customSize }) => {
  const [reason, setReason] = useState("");

  const handleReasonChange = (e) => {
    setReason(e.target.value);
  };

  const handleSubmit = () => {
    // Perform any necessary validation or submit logic
    onCancel(reason);
    onClose();
    customSize(reason);
  };

  return (
    <div className="fixed top-0 right-0 left-0 bottom-0 z-50 flex items-center justify-center bg-portrait-bg bg-cover bg-center">
      <div className="relative p-4 w-full max-w-md">
        {/* Modal content */}
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          {/* Modal header */}
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {heading}
            </h3>
            <button
              type="button"
              onClick={onClose}
              className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="authentication-modal"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          {/* Modal body */}
          <div className="p-4 md:p-5">
            <textarea
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 block dark:border-gray-500 dark:bg-gray-600 dark:placeholder-gray-400 dark:text-white"
              placeholder={
                placeholderText
                  ? placeholderText
                  : "Enter reason for cancellation..."
              }
              value={reason}
              onChange={handleReasonChange}
            />
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full mt-4 text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
