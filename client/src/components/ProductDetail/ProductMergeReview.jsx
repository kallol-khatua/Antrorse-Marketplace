import React from "react";
import ProductFeedback from "./ProductFeedback";
import ProductReview from "./productReview";

export default function ProductMergeReview({ productReview }) {
  return (
    <div className=" bg-white items-center">
      <div className="flex bg-white  justify-around">
        <div className="w-1/2  flex-shrink-0">
          <ProductReview productReview={productReview} />
        </div>
        <div className=" w-1/2  h-[100%] flex-shrink-0">
          <ProductFeedback productReview={productReview} />
        </div>
      </div>
    </div>

    // </div>
  );
}
