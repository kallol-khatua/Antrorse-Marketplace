import React from "react";

const Orders = () => {
  const orders = [
    {
      id: 1,
    },
    {
      id: 2,
    },
    {
      id: 3,
    },
  ];

  return (
    <div className="w-full sm:flex flex-col items-start py-2  mt-3 border px-2 md:px-8 bg-slate-50 2xl:px-20 2xl:mx-auto shadow-sm ">
      <p className="text-2xl text-center font-bold text-gray-800 mb-6">
        Order History
      </p>

      {orders &&
        orders.map((order) => (
          <div
            className="flex flex-col w-full justify-center items-stretch mt-2  rounded-md border shadow-sm"
            key={order.id}
          >
            <div className="flex flex-col justify-start items-start w-full space-y-2 ">
              <div className="flex flex-col justify-start items-start bg-gray-50 px-4 py-2 md:p-2 xl:p-1 w-full">
                <div className="flex flex-col md:flex-row justify-start items-start md:space-x-4 w-full p-4">
                  <div className="pb-4 md:pb-3 w-full md:w-20">
                    <img
                      className="w-full hidden md:block rounded-sm"
                      src="https://c8.alamy.com/comp/2T3F12E/trendy-sneakers-creative-poster-shot-2T3F12E.jpg"
                      alt="dress"
                    />
                    <img
                      className="w-full md:hidden"
                      src="https://i.ibb.co/L039qbN/Rectangle-10.png"
                      alt="dress"
                    />
                  </div>
                  <div className="md:flex-row flex-col flex justify-between items-start w-full pb-6 space-y-2 md:space-y-0">
                    <div className="w-[40vw] flex flex-col justify-start items-start   space-y-2">
                      <h3 className="text-xl font-semibold text-gray-800">
                        Nike shoes
                      </h3>
                      <div className="flex justify-start items-start flex-col">
                        <p className="text-sm leading-none text-gray-800">
                          <span className="dark:text-gray-400 text-gray-300">
                            Style:{" "}
                          </span>{" "}
                          Italic Minimal Design
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-between space-x-2 items-center w-full">
                      <p className="text-sm sm:text-lg font-medium  text-green-600">
                        $36.00
                      </p>
                      <p className="text-base xl:text-lg text-gray-800">1</p>
                      <div className="items-center flex flex-col">
                        <p className="text-base mr-0 md:mr-10 xl:text-lg font-semibold items-center flex">
                          <span className="w-2 h-2 text-sm bg-green-500 rounded-full mr-2"></span>{" "}
                          Delivered on 12 Jan 2023
                        </p>
                        <p className="text-green-700 text-sm">
                          Your order delivered successfully
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Orders;
