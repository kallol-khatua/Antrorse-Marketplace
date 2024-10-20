/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";

function FoodsAndBeverages({ product }) {
  //   console.log(product);
  const getSubTitle = () => {
    let subtitle = "";
    if (product.model_name) {
      subtitle += ` ${product.model_name}`;
    }
    if (product.type) {
      subtitle += ` ${product.type}`;
    }

    return subtitle;
  };

  return (
    <div className="relative flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md group">
      <Link to={`${product._id}`}>
        <div className="flex items-center justify-center h-[11.25rem] p-2 overflow-hidden group-hover:scale-105 transition-transform">
          <img
            className="object-contain w-full h-full rounded-t-sm"
            src={
              product?.images ||
              "https://m.media-amazon.com/images/I/61Y1PZx5CZL.jpg"
            }
            alt={product?.brand_name}
          />
        </div>

        <div className="mt-4 px-3 pb-3 flex flex-col flex-1 gap-1 ">
          <h5 className="text-md tracking-tight text-slate-900 line-clamp-2 font-bold">
            {product.brand_name}
          </h5>
          <p className="text-sm tracking-tight text-slate-900 line-clamp-2">
            {getSubTitle()}
          </p>
        </div>
      </Link>
    </div>
  );
}

export default FoodsAndBeverages;
