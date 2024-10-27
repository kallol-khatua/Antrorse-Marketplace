/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";

function ClothingProduct({ product }) {
  // console.log(product);
  const getSubTitle = () => {
    let subtitle = product.ideal_for;
    if (product.fit) {
      subtitle += ` ${product.fit} fit`;
    }
    if (product.fabric) {
      subtitle += ` ${product.fabric}`;
    }
    if (product.generic_name) {
      subtitle += ` ${product.generic_name}`;
    }
    if (product.variantDetails) {
      subtitle += ` (${product.variantDetails.primary_color})`;
    }
    return subtitle;
  };

  const calculateDiscount = (actualPrice, offeredPrice) => {
    let discount;
    discount = Math.round(((actualPrice - offeredPrice) / actualPrice) * 100);
    return discount;
  };

  return (
    <div className="relative flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md group">
      <Link
        to={`/clothings/view-details?productId=${product._id}&variantId=${product.variantDetails._id}&sizeVariantId=${product.sizeVariantDetails[0]._id}`}
        // to="/viewproducts"
      >
        {/* Image */}
        <div className="relative flex items-center justify-center h-[11.25rem] overflow-hidden group-hover:scale-105 transition-transform">
          <img
            className="w-full h-full object-contain rounded-t-sm"
            src={
              product?.images ||
              "https://m.media-amazon.com/images/I/71+LK6XTuFL._AC_UY1100_.jpg"
            }
            alt={product?.product_name || "Product Image"}
          />

          {product.sizeVariantDetails[0].offered_price !=
            product.sizeVariantDetails[0].actual_price && (
            <span className="absolute top-1 left-1 m-1 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
              {`${calculateDiscount(
                product.sizeVariantDetails[0].actual_price,
                product.sizeVariantDetails[0].offered_price
              )}% OFF`}
            </span>
          )}

          {/* {product.variantInventoryDetails[0].available_quantity <= 10 && (
            <span className="absolute bottom-0 left-0 bg-black px-2 text-center text-sm font-medium text-white">
              {`${product.variantInventoryDetails[0].available_quantity} Remaining`}
            </span>
          )} */}
        </div>

        <div className="mt-4 px-3 pb-3 flex flex-col flex-1 gap-1 ">
          <h5 className="text-md tracking-tight text-slate-900 line-clamp-2 font-semibold ">
            {/* {product.product_name} */}
            {/* {product.brand_name + " (" + product?.variantDetails?.primary_color + " Colour)"} */}
            {getSubTitle()}
          </h5>
          <div>
            <span className="text-md font-bold">
              ₹{product.sizeVariantDetails[0].offered_price}
            </span>{" "}
            {/* if actual price and offered proce are different */}
            <span className="text-xs line-through font-semibold">
              ₹{product.sizeVariantDetails[0].actual_price}
            </span>{" "}
            <span className="text-sm text-green-600 font-semibold">
              (
              {calculateDiscount(
                product.sizeVariantDetails[0].actual_price,
                product.sizeVariantDetails[0].offered_price
              )}
              % OFF)
            </span>{" "}
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ClothingProduct;
