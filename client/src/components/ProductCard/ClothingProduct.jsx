/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";

function ClothingProduct({ product }) {
  // console.log(product);
  const getSubTitle = () => {
    let subtitle = product.ideal_for;
    if (product.fit) {
      subtitle += ` ${product.fit}`;
    }
    if (product.fabric) {
      subtitle += ` ${product.fabric}`;
    }
    if (product.generic_name) {
      subtitle += ` ${product.generic_name}`;
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
        to={`/clothings/shirts/view-details?productId=${product._id}&variantId=${product.variants[0]._id}`}
      >
        {/* <Link to={`/productdetail/${product._id}`} inWishlist={inWishlist}> */}
        <div className="flex items-center justify-center h-[11.25rem] p-2 overflow-hidden group-hover:scale-105 transition-transform">
          <img
            className="object-contain w-full h-full rounded-t-sm"
            src={
              product?.images ||
              "https://m.media-amazon.com/images/I/71+LK6XTuFL._AC_UY1100_.jpg"
            }
            // alt={product?.name}
          />

          <span className="absolute top-1 left-1 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
            {/* {`${product.discount}`}% OFF */}
          </span>
        </div>

        <div className="mt-4 px-3 pb-3 flex flex-col flex-1 gap-1 ">
          <h5 className="text-md tracking-tight text-slate-900 line-clamp-2 font-bold">
            {product.brand_name}
          </h5>
          <p className="text-sm tracking-tight text-slate-900 line-clamp-2">
            {getSubTitle()}
          </p>
          <div>
            <span className="text-sm font-bold">
              {product.variants[0].offered_price}
            </span>{" "}
            {/* if actual price and offered proce are different */}
            <span className="text-xs line-through">
              {product.variants[0].actual_price}
            </span>{" "}
            <span className="text-xs text-red-400">
              (
              {calculateDiscount(
                product.variants[0].actual_price,
                product.variants[0].offered_price
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
