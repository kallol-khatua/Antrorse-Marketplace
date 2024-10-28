/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";

function DefaultProduct({ product }) {
  // console.log(product);

  const calculateDiscount = (actualPrice, offeredPrice) => {
    let discount;
    discount = Math.round(((actualPrice - offeredPrice) / actualPrice) * 100);
    return discount;
  };

  return (
    <div className="relative flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md group h-full">
      <Link
        to={`/default/view-details?productId=${product._id}&variantId=${product.variantDetails._id}`}
      >
        {/* Image */}
        <div className="relative flex items-center justify-center h-[11.25rem] overflow-hidden group-hover:scale-105 transition-transform">
          <img
            className="w-full h-full object-cover rounded-t-sm"
            src={
              product?.images ||
              "https://rukminim2.flixcart.com/image/416/416/xif0q/shopsy-rice-light/b/n/a/star-nc-n5610-glowtronix-original-imag84fwe9wvzezu.jpeg"
            }
            alt={product?.product_name || "Product Image"}
          />

          {product.variantDetails.offered_price !=
            product.variantDetails.actual_price && (
            <span className="absolute top-1 left-1 m-1 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
              {`${calculateDiscount(
                product.variantDetails.actual_price,
                product.variantDetails.offered_price
              )}% OFF`}
            </span>
          )}

          {product.variantInventoryDetails[0].available_quantity <= 10 && (
            <span className="absolute bottom-0 left-0 bg-black px-2 text-center text-sm font-medium text-white">
              {`${product.variantInventoryDetails[0].available_quantity} Remaining`}
            </span>
          )}
        </div>

        <div className="mt-4 px-3 pb-3 flex flex-col flex-1 gap-1 ">
          <h5 className="text-md tracking-tight text-slate-900 line-clamp-2 font-semibold ">
            {product.product_name}
          </h5>

          <div>
            <span className="text-md font-bold">
              ₹{product.variantDetails.offered_price}
            </span>{" "}
            {/* if actual price and offered proce are different */}
            {product.variantDetails.offered_price !=
              product.variantDetails.actual_price && (
              <>
                <span className="text-xs line-through font-semibold">
                  ₹{product.variantDetails.actual_price}
                </span>{" "}
                <span className="text-sm text-green-600 font-semibold">
                  (
                  {calculateDiscount(
                    product.variantDetails.actual_price,
                    product.variantDetails.offered_price
                  )}
                  % OFF)
                </span>
              </>
            )}{" "}
          </div>
        </div>
      </Link>
    </div>
  );
}

export default DefaultProduct;
