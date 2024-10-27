/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";

function FoodsAndBeveragesProduct({ product }) {
  const calculateDiscount = (actualPrice, offeredPrice) => {
    let discount;
    discount = Math.round(((actualPrice - offeredPrice) / actualPrice) * 100);
    return discount;
  };

  // console.log(product);

  const getSubTitle = () => {
    let subtitle = "";
    if (product.brand_name) {
      subtitle += ` ${product.brand_name}`;
    }
    if (product.type) {
      subtitle += ` ${product.type}`;
    }
    if (product.model_name) {
      subtitle += ` ${product.model_name}`;
    }

    if (product.quantity_type === "weight") {
      subtitle += ` (${product.variantDetails.weight_per_unit} ${product.variantDetails.unit_of_weight} ${product.variantDetails.packaging_type})`;
    } else if (product.quantity_type === "volume") {
      subtitle += ` (${product.variantDetails.volume_per_unit} ${product.variantDetails.unit_of_volume})`;
    }
    return subtitle;
  };

  return (
    <div className="relative flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md group h-full">
      <Link
        to={`/foods-and-beverages/view-details?productId=${product._id}&variantId=${product.variantDetails._id}`}
      >
        {/* Image */}
        <div className="relative flex items-center justify-center h-[11.25rem] overflow-hidden group-hover:scale-105 transition-transform">
          <img
            className="w-full h-full object-cover rounded-t-sm"
            src={
              product?.images ||
              "https://industrialoutlook.in/wp-content/uploads/2023/01/Food.webp"
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
            {getSubTitle()}
            {/* {product.product_name} */}
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

export default FoodsAndBeveragesProduct;
