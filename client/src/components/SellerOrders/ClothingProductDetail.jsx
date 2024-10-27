/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";

function ClothingProductDetail({
  productDetails,
  sizeVariantDetails,
  varinatDetails,
}) {
  console.log(productDetails);
  console.log(varinatDetails);
  console.log(sizeVariantDetails);
  return (
    <div>
      <div>
        <div>Primary color: {varinatDetails.primary_color}</div>
        <div>Primary color: {varinatDetails.secondary_color}</div>
      </div>
      <div>
        <div>Size: {sizeVariantDetails.size}</div>
        <div>SKU: {sizeVariantDetails.sku}</div>
      </div>
    </div>
  );
}

export default ClothingProductDetail;
