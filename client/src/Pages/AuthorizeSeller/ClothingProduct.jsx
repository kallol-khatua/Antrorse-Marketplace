/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";
import AdminAxiosInstance from "../../AdminAxiosInstance";
import { toast } from "react-toastify";

function ClothingProduct({ product, getSellerProducts }) {
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

  // Function to handel product rejection
  const handelRejectSellerProduct = async () => {
    try {
      const url = "/admin/authorize-seller/reject-product";
      const response = await AdminAxiosInstance.post(url, {
        productId: product._id,
      });

      if (response.status === 200) {
        getSellerProducts();
        toast.success("Product rejected successfully");
      }
    } catch (error) {
      toast.error("Error while rejecting product");
    }
  };

  return (
    <div className="relative flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md group">
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
      </div>

      <div className="mt-4 px-3 pb-3 flex flex-col flex-1 gap-1 ">
        <h5 className="text-md tracking-tight text-slate-900 line-clamp-2 font-semibold truncate">
          {/* {product.product_name} */}
          {/* {product.brand_name + " (" + product?.variantDetails?.primary_color + " Colour)"} */}
          {getSubTitle()}
        </h5>
      </div>

      <div className="mx-1 flex justify-center mb-2">
        <button
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={handelRejectSellerProduct}
        >
          Reject product
        </button>
      </div>
    </div>
  );
}

export default ClothingProduct;
