import React,{useState} from "react";
import card from"../../assets/logo/card.png"
import gpay from "../../assets/logo/gpay.png"
import paypal from"../../assets/logo/paypal.png"
import Ecom from"../../assets/logo/ecom.png"
import Ekart from"../../assets/logo/Ekart.png"


export default function Checkout() {
  const [selectedPayment, setSelectedPayment] = useState(null); // State to track selected payment
  return (
    <div>
      <div className="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-15 xl:px-28">
        <div className="mt-4 py-2 text-xs sm:mt-0 sm:ml-auto sm:text-base">
          <div className="relative">
            <ul className="relative flex w-fit h-fit items-center justify-between space-x-2 sm:space-x-4">
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <a
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700"
                  href="#"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </a>
                <span className="font-semibold text-gray-900">Shop</span>
              </li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <a
                  className="flex h-4 w-4 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white ring ring-gray-600 ring-offset-2"
                  href="#"
                >
                  2
                </a>
                <span className="font-semibold text-gray-900">Shipping</span>
              </li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <a
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white"
                  href="#"
                >
                  3
                </a>
                <span className="font-semibold text-gray-500">Payment</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
        <div className="px-4 pt-4">
          <p className="text-sm font-medium">Order Summary</p>
          <p className="text-gray-400 text-sm">
            Check your items. And select a suitable shipping method.
          </p>

          {/* order section */}
          <div className="mt-4 space-y-3 rounded-lg border bg-white px-2 py-2 sm:px-6">
            <div className="flex flex-col rounded-lg bg-white sm:flex-row">
              <img
                className="m-2 h-16 w-16 rounded-md border object-cover object-center"
                src="https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                alt=""
              />
              <div className="flex w-full flex-col px-4 py-2">
                <span className="font-semibold text-sm">
                  Nike Air Max Pro 8888 - Super Light
                </span>
                <span className="float-right text-gray-400 text-sm">42EU - 8.5US</span>
                <p className="text-sm font-bold ">&#8377;138.99</p>
              </div>
            </div>

            <div className="flex flex-col rounded-lg bg-white sm:flex-row">
              <img
                className="m-2 h-16 w-16 rounded-md border object-cover object-center"
                src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                alt=""
              />
              <div className="flex w-full flex-col px-4 py-2">
                <span className="font-semibold text-sm">
                  Nike Air Max Pro 8888 - Super Light
                </span>
                <span className="float-right text-gray-400 text-sm">42EU - 8.5US</span>
                <p className="mt-auto text-sm font-bold ">&#8377;238.99</p>
              </div>
            </div>
          </div>

          {/* shipping methods */}
          <p className="mt-4 text-sm font-medium">Shipping Methods</p>
          <form className="mt-2 grid gap-4">
            <div className="relative">
              <input
                className="peer hidden"
                id="radio_1"
                type="radio"
                name="radio"
                checked
              />
              <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
              <label
                className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-2"
                for="radio_1"
              >
                <img
                  className="w-12 object-contain"
                  src={Ekart}
                  alt=""
                />
                <div className="ml-3">
                  <span className="mt-1 font-semibold text-sm">Ekart Delivery</span>
                  <p className="text-slate-500 text-sm leading-6">
                    Delivery: 2-7 Days
                  </p>
                </div>
              </label>
            </div>
            <div className="relative">
              <input
                className="peer hidden"
                id="radio_2"
                type="radio"
                name="radio"
                checked
              />
              <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
              <label
                className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-2"
                for="radio_2"
              >
                <img
                  className="w-12 object-contain"
                  src={Ecom}
                  alt=""
                />
                <div className="ml-3">
                  <span className="mt-1 font-semibold">Ecom Express</span>
                  <p className="text-slate-500 text-sm leading-6">
                    Delivery: 2-3 Days
                  </p>
                </div>
              </label>
            </div>
          </form>
        </div>

        {/* payment Details */}
        <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0 ">
          <p className="text-sm font-small">OFFERS & COUPONS</p>

          <div className="">


            <div className="container mx-auto">
              <h1 className="text-lg font-bold mb-4">Complete your purchase</h1>
              <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
                    Email address
                  </label>
                  
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    type="email"
                    placeholder="Ex-Antrorse12@gmail.com"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
                    Name
                  </label>
                
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="name"
                    type="text"
                    placeholder="Ex-Rakesh verma"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2" htmlFor="contact">
                    Contact no
                  </label>

                
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="contact"
                    type="tel"
                    placeholder="Ex +91 922########"
                  />
                </div>
                <div className="mb-4 ">

                  <label className="block text-gray-700 font-bold mb-2" htmlFor="payment">
                    Select Payment Method
                  </label>

                  <div className="flex gap-4">
  <div
    className={`flex flex-col items-center border rounded-lg p-4 justify-center w-1/3 ${
      selectedPayment === 'credit' ? 'border-gray-800' : ''
    } `}
    onClick={() => setSelectedPayment('credit')}
  >
    <input
      className="hidden"
      type="radio"
      name="payment"
      value="credit"
      id="credit"
    />
    <label className="block text-gray-700 font-bold mb-2" htmlFor="credit">
      <img
        src={card}
        alt="Debit or Credit Card"
        className="mb-2 w-20 h-20 object-cover rounded-full items-center justify-center"
      />
      <span>Debit or Credit Card </span>
    </label>
  </div>

  <div
    className={`flex flex-col items-center border rounded-lg p-4 w-1/3 ${
      selectedPayment === 'gpay' ? 'border-gray-800' : ''
    }`}
    onClick={() => setSelectedPayment('gpay')}
  >
    <input
      className="hidden"
      type="radio"
      name="payment"
      value="gpay"
      id="gpay"
    />
    <label className="block text-gray-700 font-bold mb-2" htmlFor="gpay">
      <img
        src={gpay}
        alt="Google Pay"
        className="w-10 h-10 object-contain"
      />
      <span>Google Pay </span>
    </label>
  </div>

  <div
    className={`flex flex-col items-center border rounded-lg p-4 w-1/3  ${
      selectedPayment === 'paypal' ? 'border-gray-800' : ''
    }`}
    onClick={() => setSelectedPayment('paypal')}
  >
    <input
      className="hidden"
      type="radio"
      name="payment"
      value="paypal"
      id="paypal"
    />
    <label className="block text-gray-700 font-bold mb-2" htmlFor="paypal">
      <img
        src={paypal}
        alt="PayPal"
        className="mb-2 w-20 h-20 object-contain rounded-full items-center justify-center"
      />
      <span>PayPal </span>
    </label>
  </div>
</div>
 </div>
      {selectedPayment == 'credit' && (
  <div>
    <div className="mb-4">
      <label className="block text-gray-700 font-bold mb-2" htmlFor="card">
        Card number
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="card"
        type="text"
        placeholder="Enter your card number"
      />
    </div>
    <div className="mb-4 flex">
      <div className="w-1/2 mr-2">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="month">
          Expiration Month
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="month"
          type="text"
          placeholder="MM"
        />
      </div>
      <div className="w-1/2 ml-2">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="year">
          Expiration Year
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="year"
          type="text"
          placeholder="YYYY"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="security">
          Security Code
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="security"
          type="text"
          placeholder="123"
        />
      </div>
    </div>
  </div>
)}

{selectedPayment !== 'credit' && (
  <div>
    <div className="mb-4">
      <label className="block text-gray-700 font-bold mb-2" htmlFor="card">
        Enter Your Upi id
      </label>

      <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="security"
          type="text"
          placeholder="Ex 81121#####@paytm"
        />
      
    </div>
  </div>
)}
          </form>
            </div>
            <div className="mt-6 border-t border-b py-2">
              <div className="flex items-center justify-between">
                <p className="text-lg font-medium text-gray-900">Subtotal</p>
                <p className="font-semibold text-lg  text-gray-900">&#8377;399.00</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-lg font-medium text-gray-900">Shipping</p>
                <p className="font-semibold text-lg  text-gray-900">+&#8377;8.00</p>
              </div>
              <div className="mt-6 flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">Discount</p>
              <p className="text-sm font-semibold text-gray-900">-&#8377;200.00</p>
            </div>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <p className="text-xl font-medium text-gray-900">Total</p>
              <p className="text-xl font-semibold text-gray-900">&#8377;408.00</p>
            </div>
            
          </div>
          <button className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white">
            Place Order
          </button>
        </div>
      </div>
    </div>

  );
}
