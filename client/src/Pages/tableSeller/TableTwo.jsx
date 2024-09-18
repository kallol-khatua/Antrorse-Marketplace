// // import ProductOne from "https://placehold.co/200x100?text=Hello+World";
// // import ProductTwo from "https://placehold.co/200x100?text=Hello+World";
// // import ProductThree from "https://placehold.co/200x100?text=Hello+World";
// // import ProductFour from "https://placehold.co/200x100?text=Hello+World";
// import React, { useState, useEffect } from 'react';

// const TableTwo = () => {

//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//          const response = await fetch('http://localhost:3000/app/admin/totalOrder');
//         if (!response.ok) {
//           throw new Error('Failed to fetch orders');
//         }
//         const data = await response.json();
//         setOrders(data.result);
//         console.log(orders)

//       } catch (error) {
//         console.error('Error fetching orders:', error);
//       }
//     };

//    fetchOrders();
//   }, []);

//   return (
//     <div className="rounded-sm border border-gray-200 bg-white shadow-lg ">
//       <div className="py-6 px-4 md:px-6 xl:px-7.5">
//         <h4 className="text-xl font-semibold">
//           Top Products
//         </h4>
//       </div>

//       <div className="flex flex-col gap-4">
//         <div className="grid grid-cols-6 border-t border-gray-200 py-4.5 px-4 sm:grid-cols-8 md:px-6 2xl:px-7.5">
//           <div className="col-span-2 flex items-center">
//             <p className="font-medium">Product Image</p>
//           </div>
//           <div className="col-span-1 flex items-center">
//             <p className="font-medium">Product Name</p>
//           </div>
//           <div className="col-span-2 hidden items-center sm:flex">
//             <p className="font-medium">Category</p>
//           </div>
//           <div className="col-span-1 flex items-center">
//             <p className="font-medium">Price</p>
//           </div>
//           <div className="col-span-1 flex items-center">
//             <p className="font-medium">Sold</p>
//           </div>
//           <div className="col-span-1 flex items-center">
//             <p className="font-medium">Profit</p>
//           </div>
//         </div>

// {orders.map(order=>(

//         <div className="grid grid-cols-6 border-t border-gray-200 py-4.5 px-4  sm:grid-cols-8 md:px-6 2xl:px-7.5">
//           <div className="col-span-3  flex items-center">
//             <div className="flex flex-col gap-4 sm:flex-row sm:items-center justify-between w-full pr-8">
//               <div className="flex items-center justify-center rounded-md   h-[6.125rem]  w-[10.75rem]   ">
//                 <img
//                   src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//                   alt="Product"
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//               <p className="text-sm text-black ">
//                 {order.orderItems.product_name}
//                 {console.log(order.orderItems.product_name)}
//               </p>
//             </div>
//           </div>
//           <div className="col-span-2 hidden items-center sm:flex">
//             <p className="text-sm text-black ">Electronics</p>
//           </div>
//           <div className="col-span-1 flex items-center">
//             <p className="text-sm text-black ">&#8377;{order.totalPrice}</p>
//           </div>
//           <div className="col-span-1 flex items-center">
//             <p className="text-sm text-black ">22</p>
//           </div>
//           <div className="col-span-1 flex items-center">
//             <p className="text-sm text-emerald-500">&#8377;45</p>
//           </div>
//         </div>
//        ))}

//       </div>
//     </div>
//   );
// };

// export default TableTwo;

import React, { useState, useEffect } from "react";

const TableTwo = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/app/admin/totalOrder`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }
        const data = await response.json();
        setOrders(data.result);
        console.log(orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="rounded-sm border border-gray-200 bg-white h-[40rem] overflow-hidden shadow-lg ">
      <div className="py-6 px-4 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold">Top Products</h4>
      </div>

      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-7 border-t border-gray-200 py-4.5 px-4 sm:grid-cols-8 md:px-6 2xl:px-7.5">
          <div className="col-span-2 flex items-center  ">
            <p className="font-bold ">Product Image</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-bold">Product Name</p>
          </div>
          <div className="col-span-2 items-center sm:flex">
            <p className="font-bold">Category</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-bold">Price</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-bold">Sold</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-bold">Profit</p>
          </div>
        </div>

        {orders.map((order) => (
          <div key={order._id}>
            {order.orderItems.map((item) => (
              <div
                className="grid  grid-cols-6 border-t border-gray-200 py-5 px-4  sm:grid-cols-8 md:px-6 2xl:px-7.5"
                key={item._id}
              >
                <div className="col-span-2 flex items-center">
                  <img
                    src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Product"
                    className="w-28 h-20 object-cover"
                  />
                  {/* <img src={item.image_url} alt="Product" className="w-20 h-20 object-cover rounded-md" /> */}
                </div>
                <div className="col-span-1 flex items-center">
                  <p className="text-sm text-black">{item.product_name}</p>
                </div>
                <div className="col-span-2 hidden items-center sm:flex">
                  <p className="text-sm text-black">Electronics</p>
                </div>
                <div className="col-span-1 flex items-center">
                  <p className="text-sm text-black">&#8377;{item.price}</p>
                </div>
                <div className="col-span-1 flex items-center">
                  <p className="text-sm text-black">22</p>
                </div>
                <div className="col-span-1 flex items-center">
                  <p className="text-sm text-emerald-500">&#8377;45</p>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableTwo;
