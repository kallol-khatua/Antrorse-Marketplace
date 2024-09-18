import React, { useState } from "react";

const ProductDescription = ({product}) => {

  // const {  brand_name, mater } = product;
  // console.log( brand_name, mater);
  const productDetails = product[0]?.productDetails[0];
  console.log(productDetails.description)

  const [showDescription, setShowDescription] = useState(true);
  const [showSpecialization, setShowSpecialization] = useState(false);

  const toggleDescription = () => {
    setShowDescription(!showDescription);
    setShowSpecialization(false); // Close specialization if open
  };

  const toggleSpecialization = () => {
    setShowSpecialization(!showSpecialization);
    setShowDescription(false); // Close description if open
  };

  return (
    <div className="w-[90%] m-auto p-3">
      <div className="flex justify-center gap-4 text-lg mb-6 border-b-2 pb-3  ">
        <div className="cursor-pointer" onClick={toggleDescription}>
          <h2 className="font-bold text-lg">Description</h2>
        </div>
        <div className="cursor-pointer" onClick={toggleSpecialization}>
          <h3 className="font-bold text-lg">Specification</h3>
        </div>
      </div>

      <div className={showDescription ? "block" : "hidden"}>
        <h2 className="text-gray-500 font-bold text-lg mb-3">Description</h2>
        <p className="text-gray-500 text-md">
          {productDetails.description}
        </p>
      </div>
      <div className={showSpecialization ? "block" : "hidden"}>
        <h1 className="text-gray-500  font-bold text-lg mb-3">
          Specification
        
{/* 
 
  <div class="w-1/3 pr-4">
    <h1 class="text-sm font-semibold"></h1>
    <h1 class="text-gray-500  font-bold text-lg mb-3">Product category:{product_category}</h1>
  </div>
  <div class="w-1/3 pr-4">
 
    <p class="text-gray-500  font-bold text-lg mb-3">Brand Name:{brand_name}</p>
  </div>
  <div class="w-1/3">
   
    <p class="text-gray-500  font-bold text-lg mb-3">Material:{material}</p>
  </div> */}






        </h1>
        <p className="text-gray-500 text-md">
         
        </p>
      </div>
    </div>
  );
};

export default ProductDescription;
