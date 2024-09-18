import { Link } from "react-router-dom";

const OrderCompleted = () => {
  return (
    <section className="flex items-center py-4 bg-gray-200 font-poppins dark:bg-gray-800 ">
      <div className="justify-center flex-1 max-w-4xl px-6 py-6 mx-auto bg-gray-100 rounded-md shadow-md dark:border-gray-900 dark:bg-gray-900 lg:py-10 lg:px-10">
        <div className="mb-8 text-center">
          <h1 className="mb-6 text-2xl font-semibold leading-7 tracking-wide text-gray-700 lg:text-4xl dark:text-gray-300 lg:leading-9">
            Thank you for your Order, John!
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400">
            your order number is: 029837614267
          </p>
        </div>
        <div className="max-w-4xl mx-auto mb-10">
          <h2 className="mb-4 text-xl font-medium dark:text-gray-400">
            What you ordered:
          </h2>
          <div className="p-10 mb-8 bg-white rounded-md shadow dark:bg-gray-800 sm:flex sm:items-center xl:py-5 xl:px-12">
            <a href="#" className="mr-6 md:mr-12">
              <img
                className=" w-full lg:w-[80px] h-[200px] lg:h-[80px]  object-cover  mx-auto mb-6 sm:mb-0 "
                src="https://i.postimg.cc/YS2pPP8k/white-denim-jacket-front-view-streetwear-fashion.jpg "
                alt="dress"
              />
            </a>
            <div>
              <a
                className="inline-block mb-1 text-lg font-medium hover:underline dark:text-gray-400"
                href="#"
              >
                White jacket for men
              </a>
              <div className="flex flex-wrap">
                <p className="mr-4 text-sm font-medium">
                  <span className="font-medium dark:text-gray-400">Color:</span>
                  <span className="ml-2 text-gray-400 dark:text-gray-400">
                    Silver
                  </span>
                </p>
                <p className="mr-4 text-sm font-medium">
                  <span className="font-medium dark:text-gray-400">Size:</span>
                  <span className="ml-2 text-gray-400 dark:text-gray-400">
                    medium
                  </span>
                </p>
                <p className="mr-4 text-sm font-medium">
                  <span className="font-medium dark:text-gray-400">Style:</span>
                  <span className="ml-2 text-gray-400 dark:text-gray-400">
                    Uk minimal design
                  </span>
                </p>
                <p className="text-sm font-medium dark:text-gray-400">
                  <span>Qty:</span>
                  <span className="ml-2 text-gray-400">1</span>
                </p>
              </div>
              <p className="text-base font-semibold leading-4 text-black-600 dark:text-gray-400 mt-2">
                Rs.400
              </p>
            </div>
          </div>
          <div className="p-10 bg-white rounded-md shadow dark:bg-gray-800 sm:flex sm:items-center xl:py-5 xl:px-12">
            <a href="#" className="mr-6 md:mr-12">
              <img
                className=" w-full lg:w-[80px] h-[200px] lg:h-[80px] object-cover  mx-auto mb-6 sm:mb-0 "
                src="https://i.postimg.cc/br9C4mmc/430.jpg "
                alt="dress"
              />
            </a>
            <div>
              <a
                className="inline-block mb-1 text-lg font-medium dark:text-gray-400 hover:underline"
                href="#"
              >
                Summer Black T-shirt
              </a>
              <div className="flex flex-wrap">
                <p className="mr-4 text-sm font-medium dark:text-gray-400">
                  <span className="font-medium">Color:</span>
                  <span className="ml-2 text-gray-400">Silver</span>
                </p>
                <p className="mr-4 text-sm font-medium dark:text-gray-400">
                  <span className="font-medium">Size:</span>
                  <span className="ml-2 text-gray-400">medium</span>
                </p>
                <p className="mr-4 text-sm font-medium dark:text-gray-400">
                  <span className="font-medium">Style:</span>
                  <span className="ml-2 text-gray-400">Uk minimal design</span>
                </p>
                <p className="text-sm font-medium dark:text-gray-400">
                  <span>Qty:</span>
                  <span className="ml-2 text-gray-400">1</span>
                </p>
              </div>
              <p className="text-base font-semibold leading-4 text-black-600 dark:text-gray-400 mt-2">
                Rs.300
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center pb-4 mb-5 border-b border-gray-200 dark:border-gray-700">
          <div className="w-full px-4 mb-4 md:w-1/4">
            <p className="mb-2 text-sm leading-5 text-gray-600 dark:text-gray-400 ">
              Order Number:{" "}
            </p>
            <p className="text-base font-semibold leading-4 text-gray-800 dark:text-gray-400">
              029837614267
            </p>
          </div>
          <div className="w-full px-4 mb-4 md:w-1/4">
            <p className="mb-2 text-sm leading-5 text-gray-600 dark:text-gray-400 ">
              Date:{" "}
            </p>
            <p className="text-base font-semibold leading-4 text-gray-800 dark:text-gray-400">
              March 18, 2022
            </p>
          </div>
          <div className="w-full px-4 mb-4 md:w-1/4">
            <p className="mb-2 text-sm font-medium leading-5 text-gray-800 dark:text-gray-400 ">
              Total:{" "}
            </p>
            <p className="text-base font-semibold leading-4 text-blue-600 dark:text-gray-400">
              Rs.700
            </p>
          </div>
          <div className="w-full px-4 mb-4 md:w-1/4">
            <p className="mb-2 text-sm leading-5 text-gray-600 dark:text-gray-400 ">
              Payment Method:{" "}
            </p>
            <p className="text-base font-semibold leading-4 text-gray-800 dark:text-gray-400 ">
              Cash on delivery{" "}
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto ">
          <div className="px-4 mb-10">
            <div className="flex flex-col items-stretch justify-center w-full space-y-4 md:flex-row md:space-y-0 md:space-x-8">
              <div className="flex flex-col w-full space-y-6 ">
                <h2 className="mb-2 text-xl font-semibold text-gray-700 dark:text-gray-400">
                  Order details
                </h2>
                <div className="flex flex-col items-center justify-center w-full pb-4 space-y-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between w-full">
                    <p className="text-base leading-4 text-gray-800 dark:text-gray-400">
                      Subtotal
                    </p>
                    <p className="text-base leading-4 text-gray-600 dark:text-gray-400">
                      Rs.1000
                    </p>
                  </div>
                  <div className="flex items-center justify-between w-full">
                    <p className="text-base leading-4 text-gray-800 dark:text-gray-400">
                      Discount
                    </p>
                    <p className="text-base leading-4 text-gray-600 dark:text-gray-400">
                      10%
                    </p>
                  </div>
                  <div className="flex items-center justify-between w-full">
                    <p className="text-base leading-4 text-gray-800 dark:text-gray-400">
                      Shipping
                    </p>
                    <p className="text-base leading-4 text-gray-600 dark:text-gray-400">
                      Rs.100
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between w-full">
                  <p className="text-base font-semibold leading-4 text-gray-800 dark:text-gray-400">
                    Total
                  </p>
                  <p className="text-base font-semibold leading-4 text-gray-600 dark:text-gray-400">
                    Rs.700
                  </p>
                </div>
              </div>
              <div className="flex flex-col w-full px-2 space-y-4 md:px-8 ">
                <h2 className="mb-2 text-xl font-semibold text-gray-700 dark:text-gray-400">
                  Shipping
                </h2>
                <div className="flex items-start justify-between w-full">
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-8 h-8">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="w-6 h-6 text-blue-600 dark:text-blue-400 bi bi-truck"
                        viewBox="0 0 16 16"
                      >
                        <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5v-7zm1.294 7.456A1.999 1.999 0 0 1 4.732 11h5.536a2.01 2.01 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456zM12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12v4zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"></path>
                      </svg>
                    </div>
                    <div className="flex flex-col items-center justify-start">
                      <p className="text-lg font-semibold leading-6 text-gray-800 dark:text-gray-400">
                        Delivery
                        <br />
                        <span className="text-sm font-normal">
                          Delivery with 24 Hours
                        </span>
                      </p>
                    </div>
                  </div>
                  <p className="text-lg font-semibold leading-6 text-gray-800 dark:text-gray-400">
                    Rs.50
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4 ">
            <Link to="/viewproducts" className="w-full px-6 py-3 text-blue-500 border border-blue-500 rounded-md md:w-auto hover:text-gray-100 hover:bg-blue-600 dark:border-gray-800 dark:hover:bg-gray-800 dark:text-gray-300">
              Go back shopping
            </Link>
            <button className="w-full px-6 py-3 text-gray-100 bg-blue-500 rounded-md md:w-auto dark:text-gray-300 hover:bg-blue-600 dark:hover:bg-gray-800 dark:bg-gray-700">
              Download Invoice
            </button>
          </div>
        </div>  
      </div>
    </section>
  );
};

export default OrderCompleted;

// const OrderCompleted = () => {
//   return (
//     <section className="flex items-center py-16 bg-gray-50 font-poppins dark:bg-gray-800 ">
//     <div
//         className="justify-center flex-1 max-w-4xl px-6 py-6 mx-auto bg-gray-100 rounded-md shadow-md dark:border-gray-900 dark:bg-gray-900 lg:py-10 lg:px-10">
//         <div className="mb-16 text-center">
//             <h1
//                 className="mb-6 text-2xl font-semibold leading-7 tracking-wide text-gray-700 lg:text-4xl dark:text-gray-300 lg:leading-9">
//                 Thank you for your Order, John!</h1>
//             <p className="text-lg text-gray-500 dark:text-gray-400">your order number is: 012736373737</p>
//         </div>
//         <div className="max-w-4xl mx-auto mb-10">
//             <h2 className="mb-4 text-xl font-medium dark:text-gray-400">What you ordered:</h2>
//             <div
//                 className="p-10 mb-8 bg-white rounded-md shadow dark:bg-gray-800 sm:flex sm:items-center xl:py-5 xl:px-12">
//                 <a href="#" className="mr-6 md:mr-12">
//                     <img className=" w-full lg:w-[80px] h-[200px] lg:h-[80px]  object-cover  mx-auto mb-6 sm:mb-0 "
//                         src="https://i.postimg.cc/YS2pPP8k/white-denim-jacket-front-view-streetwear-fashion.jpg "
//                         alt="dress"/>
//                 </a>
//                 <div>
//                     <a className="inline-block mb-1 text-lg font-medium hover:underline dark:text-gray-400" href="#">
//                         White jacket for men</a>
//                     <div className="flex flex-wrap">
//                         <p className="mr-4 text-sm font-medium">
//                             <span className="font-medium dark:text-gray-400">Color:</span>
//                             <span className="ml-2 text-gray-400 dark:text-gray-400">Silver</span>
//                         </p>
//                         <p className="mr-4 text-sm font-medium">
//                             <span className="font-medium dark:text-gray-400">Size:</span>
//                             <span className="ml-2 text-gray-400 dark:text-gray-400">medium</span>
//                         </p>
//                         <p className="mr-4 text-sm font-medium">
//                             <span className="font-medium dark:text-gray-400">Style:</span>
//                             <span className="ml-2 text-gray-400 dark:text-gray-400">Uk minimal design</span>
//                         </p>
//                         <p className="text-sm font-medium dark:text-gray-400">
//                             <span>Qty:</span>
//                             <span className="ml-2 text-gray-400">1</span>
//                         </p>
//                     </div>
//                 </div>
//             </div>
//             <div className="p-10 bg-white rounded-md shadow dark:bg-gray-800 sm:flex sm:items-center xl:py-5 xl:px-12">
//                 <a href="#" className="mr-6 md:mr-12">
//                     <img className=" w-full lg:w-[80px] h-[200px] lg:h-[80px] object-cover  mx-auto mb-6 sm:mb-0 "
//                         src="https://i.postimg.cc/br9C4mmc/430.jpg " alt="dress"/>
//                 </a>
//                 <div>
//                     <a className="inline-block mb-1 text-lg font-medium dark:text-gray-400 hover:underline" href="#">
//                         Summer Black T-shirt
//                     </a>
//                     <div className="flex flex-wrap">
//                         <p className="mr-4 text-sm font-medium dark:text-gray-400">
//                             <span className="font-medium">Color:</span>
//                             <span className="ml-2 text-gray-400">Silver</span>
//                         </p>
//                         <p className="mr-4 text-sm font-medium dark:text-gray-400">
//                             <span className="font-medium">Size:</span>
//                             <span className="ml-2 text-gray-400">medium</span>
//                         </p>
//                         <p className="mr-4 text-sm font-medium dark:text-gray-400">
//                             <span className="font-medium">Style:</span>
//                             <span className="ml-2 text-gray-400">Uk minimal design</span>
//                         </p>
//                         <p className="text-sm font-medium dark:text-gray-400">
//                             <span>Qty:</span>
//                             <span className="ml-2 text-gray-400">1</span>
//                         </p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//         <div className="max-w-4xl mx-auto ">
//             <h2 className="mb-4 text-xl font-medium dark:text-gray-400 ">Order Details:</h2>
//             <div className="grid grid-cols-1 gap-8 mb-10 lg:grid-cols-3">
//                 <div
//                     className="flex items-center justify-between px-10 py-3 font-medium leading-8 bg-white bg-opacity-50 rounded-md shadow dark:text-gray-400 dark:bg-gray-800 font-heading">
//                     <span>Shipping</span>
//                     <span className="flex items-center">
//                         <span className="ml-3 mr-1 text-sm">Rs.</span>
//                         <span className="text-xl">4,000</span>
//                     </span>
//                 </div>
//                 <div
//                     className="relative flex items-center justify-between px-10 py-3 font-medium leading-8 bg-white bg-opacity-50 rounded-md shadow dark:text-gray-400 dark:bg-gray-800">
//                     <div
//                         className="absolute right-0 flex items-center justify-center bg-blue-500 rounded-md w-14 h-14 dark:bg-gray-600">
//                         <div
//                             className="flex items-center justify-center text-lg font-bold text-blue-500 bg-gray-100 rounded-full dark:text-gray-300 dark:bg-gray-700 w-11 h-11">
//                             2</div>
//                     </div>
//                     <span className="mr-16">Products</span>
//                 </div>
//                 <div
//                     className="flex items-center justify-between px-10 py-3 font-medium leading-8 bg-white rounded-md shadow dark:text-gray-400 dark:bg-gray-800 font-heading">
//                     <span>Total</span>
//                     <span className="flex items-center text-blue-500 dark:text-blue-400">
//                         <span className="ml-3 mr-1 text-sm">Rs.</span>
//                         <span className="text-xl">7,000</span>
//                     </span>
//                 </div>
//             </div>
//             <div className="flex flex-wrap items-center justify-between gap-4 ">
//                 <button
//                     className="w-full px-6 py-3 text-blue-500 border border-blue-500 rounded-md md:w-auto hover:text-gray-100 hover:bg-blue-600 dark:border-gray-800 dark:hover:bg-gray-800 dark:text-gray-300">
//                     Go back shopping
//                 </button>
//                 <button
//                     className="w-full px-6 py-3 text-gray-100 bg-blue-500 rounded-md md:w-auto dark:text-gray-300 hover:bg-blue-600 dark:hover:bg-gray-800 dark:bg-gray-700">
//                     Download Invoice
//                 </button>
//             </div>
//         </div>

//     </div>
// </section>
//   )
// }

// export default OrderCompleted
