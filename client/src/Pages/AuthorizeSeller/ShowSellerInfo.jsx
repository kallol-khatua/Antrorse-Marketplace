import React, { useEffect, useState } from "react";

function ShowSellerInfo() {
  const [sellerData, setSellerData] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    try {
      //
    } catch (error) {
      console.log("Error while fetching seller details and products");
    }
  }, []);

  return (
    <div>
      <h2 className=" text-2xl shadow-sm font-bold text-center border-b mb-2 pb-4">
        Authorize seller
      </h2>
    </div>
  );
}

export default ShowSellerInfo;
